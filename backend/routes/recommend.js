// import express from "express";
// import axios from "axios";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const mlResponse = await axios.post(
//       "http://127.0.0.1:8000/recommend",
//       req.body,
//       { timeout: 8000 }
//     );

//     res.status(200).json({
//       success: true,
//       recommendations: mlResponse.data.recommendations
//     });

//   } catch (error) {
//     console.error("ML API error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "ML service unavailable"
//     });
//   }
// });

// export default router;

import express from "express";
import axios from "axios";

import { buildContext } from "../services/contextBuilder.js";
import { getSeasonByDate } from "../services/seasonService.js";
import { getHistoricalYield } from "../services/daService.js";
import { generateExplanation } from "../services/explanationService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { state, region, rainfallType, cyclone } = req.body;

    // 1. Build intelligent context
    const context = buildContext({
      state,
      region,
      rainfallType,
      cyclone
    });

    const season = getSeasonByDate();

    // 2. Call ML service
    const mlResponse = await axios.post(
      "http://localhost:8000/recommend",
      context,
      { timeout: 8000 }
    );

    // 3. Enrich ML output with DA explanations
    const enrichedRecommendations =
      mlResponse.data.recommendations.map((r) => {
        const historicalAvg = getHistoricalYield(
          state,
          region,
          season,
          r.crop
        );

        return {
          crop: r.crop,
          expected_yield: r.expected_yield,
          historical_avg_yield: historicalAvg,
          confidence:
            historicalAvg && r.expected_yield > historicalAvg
              ? "High"
              : "Medium",
          why: generateExplanation({
            crop: r.crop,
            context,
            historicalAvg,
            predicted: r.expected_yield
          })
        };
      });

    // 4. Send analytics-style response
    res.json({
      season,
      context_used: context,
      recommendations: enrichedRecommendations
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate crop recommendation"
    });
  }
});

export default router;
