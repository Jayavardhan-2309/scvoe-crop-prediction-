const users = []; // temporary in-memory store

export function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

export function createUser(user) {
  users.push(user);
  return user;
}
