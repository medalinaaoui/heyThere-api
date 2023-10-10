import { db } from "../model/db.js";
const sentFollowController = (req, res) => {
  const { follower_id, followed_id } = req.body;
  const q = "insert into relationships(follower_id, followed_id) VALUE (?, ?)";

  db.query(q, [follower_id, followed_id], (err) => {
    if (err) {
      res.status(402).json({ error: err }); // Send an error response
    } else {
      res.status(200).json({ message: "Followed successfully" }); // Send a success response
    }
  });
};
export default sentFollowController;
