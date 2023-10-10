import { db } from "../model/db.js";

const commentsController = (req, res) => {
  const postId = req.params.postId;

  const q =
    "SELECT  c.id as commentId, c.content, c.created_at, u.username, u.profilePic, u.id as userId from comments as c INNER join users as u on c.user_id = u.id where c.post_id = ?";
  db.query(q, [postId], (err, results) => {
    if (err) return res.status(403).json({ error: err });
    res.status(200).json(results);
  });
};

export default commentsController;
