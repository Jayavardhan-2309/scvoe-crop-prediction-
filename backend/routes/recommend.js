import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/recommend",
      req.body,
      { timeout: 8000 }
    );

    res.status(200).json({
      success: true,
      recommendations: mlResponse.data.recommendations
    });

  } catch (error) {
    console.error("ML API error:", error.message);

    res.status(500).json({
      success: false,
      message: "ML service unavailable"
    });
  }
});

export default router;
