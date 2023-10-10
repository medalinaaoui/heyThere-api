import { db } from "../model/db.js";

const deleteLikeController = (req, res) => {
  const { user_id, post_id } = req.body;
  const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";

  db.query(q, [user_id, post_id], (err, results) => {
    if (err) {
      res.status(402).json({ error: err });
    } else {
      res.status(200).json({ isLiked: false });
    }
  });
};

export default deleteLikeController;
