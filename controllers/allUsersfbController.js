import { db } from "../model/db.js";

const allUsersController = (req, res) => {
  const userId = req.query.userId;
  const limit = req.query.limit;

  const q =
    "SELECT u.* FROM users u INNER JOIN relationships r1 ON u.id = r1.follower_id LEFT JOIN relationships r2 ON u.id = r2.followed_id AND r2.follower_id = ? WHERE r1.followed_id = ? AND r2.id IS NULL LIMIT ?";

  db.query(
    q,
    [parseInt(userId), parseInt(userId), parseInt(limit)],
    (err, results) => {
      if (err) {
        res.status(402).json({ error: err });
      } else {
        res.status(200).json({ results });
      }
    }
  );
};

export default allUsersController;
