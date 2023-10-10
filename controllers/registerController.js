import { db } from "../model/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/environmentVariables.js";
//cookie
const registerController = (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password)
    return res.status(402).json({ message: "please fill in the info" });
  const accessSecret = env.accessSecret;
  const refreshSecret = env.refreshSecret;
  const q =
    "SELECT users.*, GROUP_CONCAT(DISTINCT post.id) AS posts, GROUP_CONCAT(DISTINCT comments.id) AS comments FROM users LEFT JOIN post ON users.id = post.user_id LEFT JOIN comments ON users.id = comments.user_id WHERE users.username = ? GROUP BY users.id";
  db.query(q, [username], async function (err, results) {
    if (err) return res.status(500).json({ error: err });
    if (results.length)
      return res.status(403).json({ message: "username is taken" });
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const insert =
      "INSERT INTO users(username, email, full_name, password, refresh_token) VALUES (?, ?, ?, ?, ?)";
    db.query(insert, [username, email, name, hashedPassword, ""], (err) => {
      if (err) return res.status(500).json({ error: err });

      const getUserDataQuery = "SELECT * FROM users WHERE username = ?";
      db.query(getUserDataQuery, [username], (err, userDataResults) => {
        if (err) return res.status(500).json({ error: err });
        if (userDataResults.length === 0) {
          return res.status(500).json({ error: "Something went wrong" });
        }
        const refresh_token = jwt.sign(
          { userId: userDataResults[0].id },
          refreshSecret,
          {
            expiresIn: "8d",
          }
        );

        const access_token = jwt.sign(
          { userId: userDataResults[0].id },
          accessSecret,
          {
            expiresIn: "30m",
          }
        );
        const updateRefreshTokenQuery =
          "UPDATE users SET refresh_token = ? WHERE id = ?";
        db.query(
          updateRefreshTokenQuery,
          [refresh_token, userDataResults[0].id],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            res.cookie("refreshToken", refresh_token, {
              httpOnly: true,
              sameSite: "None",
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 8,
            });
            const {
              password,
              refresh_token: _,
              ...userData
            } = userDataResults[0];
            return res.status(200).json({
              message: "User registerd successfully",
              access_token,
              userData,
            });
          }
        );
      });
    });
  });
};

export default registerController;
