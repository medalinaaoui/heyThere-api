import { db } from "../model/db.js";

const allUsersController = (req, res) => {
  const userId = req.query.userId;
  const limit = req.query.limit;

  const q =
    "SELECT u.bio, u.coverPic, u.email, u.full_name, u.id, u.location, u.profilePic, u.username, u.website FROM users as u LEFT JOIN relationships as r ON u.id = r.followed_id AND r.follower_id = ? WHERE r.id IS NULL AND u.id != ? LIMIT ?";

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
