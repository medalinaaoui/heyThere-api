import { db } from "../model/db.js";
const logoutController = (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  if (!cookies || !refreshToken)
    return res.status(402).json({ message: "no content to send back 1" });
  const q = "SELECT * FROM users WHERE refresh_token = ?";
  db.query(q, [refreshToken], (err, results) => {
    if (err) return res.status(400).json({ error: err });
    if (!results[0]) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(402).json({ message: "no content to send back 2" });
    }

    // delete refresh token from db
    const deleteRefreshTokenQuery =
      "UPDATE users SET refresh_token = NULL WHERE id = ?";

    db.query(deleteRefreshTokenQuery, [results[0].id], (err) => {
      if (err) return res.status().json({ error: err });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.status(200).json({ message: "user logout successfully" });
    });
  });
};

export default logoutController;
