import { db } from "../model/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/environmentVariables.js";
//cookie
const loginController = (req, res) => {
  // const { username, password } = req.body;
  const q =
    "SELECT users.*, GROUP_CONCAT(DISTINCT post.id) AS posts, GROUP_CONCAT(DISTINCT comments.id) AS comments FROM users LEFT JOIN post ON users.id = post.user_id LEFT JOIN comments ON users.id = comments.user_id WHERE users.username = ? GROUP BY users.id";
  db.query(q, [req.body.username], function (err, results) {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(402).send("user not found");
    const compare = bcrypt.compareSync(req.body.password, results[0].password);
    if (!compare) return res.status(403).send(" wrong password");
    // generate token for user

    const accessSecret = env.accessSecret;
    const refreshSecret = env.refreshSecret;
    const refresh_token = jwt.sign({ userId: results[0].id }, refreshSecret, {
      expiresIn: "8d",
    });
    const access_token = jwt.sign({ userId: results[0].id }, accessSecret, {
      expiresIn: "30m",
    });

    const updateRefreshTokenQuery =
      "UPDATE users SET refresh_token = ? WHERE id = ?";
    db.query(updateRefreshTokenQuery, [refresh_token, results[0].id], (err) => {
      if (err) return res.status(500).json({ error: err });
    });
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 8,
    });
    const { password, refresh_token: _, ...userData } = results[0];

    return res.status(200).json({
      message: "logged in successfully",
      access_token,
      userData,
    });
  });
};

export default loginController;
