import "dotenv/config";
const env = {
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  saltRounds: process.env.SALT_ROUNDS,
};

export default env;
