import { db } from "../model/db.js";

const addLikeController = (req, res) => {
  const { user_id, post_id } = req.body;
  const q = "insert into likes(user_id, post_id) value(?, ?)";

  db.query(q, [user_id, post_id], (err, results) => {
    if (err) {
      res.status(402).json({ error: err });
    } else {
      res.status(200).json({ isLiked: true });
    }
  });
};

export default addLikeController;
