import { db } from "../model/db.js";
import env from "../config/environmentVariables.js";
import jwt from "jsonwebtoken";

const refreshAccessTokenController = (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  if (!cookies || !refreshToken)
    return res.status(401).json({ message: "unathorize" });
  const q =
    "SELECT users.*, GROUP_CONCAT(DISTINCT post.id) AS posts, GROUP_CONCAT(DISTINCT comments.id) AS comments FROM users LEFT JOIN post ON users.id = post.user_id LEFT JOIN comments ON users.id = comments.user_id WHERE users.refresh_token = ? GROUP BY users.id";
  db.query(q, [refreshToken], (err, results) => {
    if (err) return res.status(401).json({ error: err });
    if (results.length === 0)
      return res.status(400).json({ message: "forbidden user not found" });

    jwt.verify(refreshToken, env.refreshSecret, (err, decoded) => {
      if (err || decoded.userId !== results[0].id)
        return res.status(402).json({ message: "forbidden 2" });

      const access_token = jwt.sign(
        { userId: results[0].id },
        env.accessSecret,
        {
          expiresIn: "30m",
        }
      );
      const { password, refresh_token: _, ...userData } = results[0];
      res.status(200).json({
        access_token,
        userData,
      });
    });
  });
};
export default refreshAccessTokenController;
