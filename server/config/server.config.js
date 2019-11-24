// Return an object containing exactly what we want to save to our session
const sessionizeUser = ( user ) => {
  return { userId: user.userID, username: user.username };
};

module.exports = {
  MONGO_DB_HOST: 'localhost',
  MONGO_DB_PORT: '27017',
  MONGO_DB_DATABASE: 'cs3320',
  // Destructure / Define a session name, secret, and lifetime
  SESS_NAME: 'sid',
  // SESS_SECRET used to hash sessionID with Hash-Based Authentication Codes (HMAC)
  SESS_SECRET: 'secret!session',
  SESS_LIFETIME: 1000 * 60 * 60, // Two days
  sessionizeUser,
  JWT_KEY: 'CS3320JsonWebTokenKey'
};
