import { db } from "../model/db.js";

const addCommentController = (req, res) => {
  const { post_id, user_id, content } = req.body;
  const q = "insert into comments(post_id, user_id, content) value(?, ?, ?)";

  db.query(q, [post_id, user_id, content], (err, results) => {
    if (err) res.status(402).json({ error: err });
    if (!err) res.status(200).json({ message: "Comment added successfully" });
  });
};

export default addCommentController;
