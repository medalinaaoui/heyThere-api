import { db } from "../model/db.js";

const usersController = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT u.bio, u.coverPic, u.email, u.full_name, u.id, u.location, u.profilePic, u.username, u.website, COUNT(DISTINCT p.id) AS num_posts, COUNT(DISTINCT r1.id) AS num_followers, COUNT(DISTINCT r2.id) AS num_following FROM users u LEFT JOIN post p ON u.id = p.user_id LEFT JOIN relationships r1 ON u.id = r1.followed_id LEFT JOIN relationships r2 ON u.id = r2.follower_id WHERE u.id = ? GROUP BY u.id, u.username, u.email, u.full_name, u.coverPic, u.profilePic, u.bio, u.location, u.website";

  db.query(q, [id], (err, results) => {
    if (err) res.status(402).json({ error: err });
    const userData = results[0];
    res.status(200).json({ userData });
  });
};

export default usersController;
