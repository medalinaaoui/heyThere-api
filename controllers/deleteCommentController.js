import { db } from "../model/db.js";
const deletePostController = (req, res) => {
  const { user_id, comment_id } = req.body;
  const q = "SELECT * FROM comments WHERE user_id = ?";
  const deleteQ = "DELETE FROM comments where id = ?";

  db.query(q, [user_id], (err, results) => {
    if (err) {
      return res.status(402).json({ error: err });
    } else if (results) {
      const wantedPost = results.find((p) => p.id === comment_id);

      if (!wantedPost)
        return res.status(402).json({ message: "no comment to delete" });
      db.query(deleteQ, [comment_id], (err, result) => {
        if (err) return res.status(401).json({ error: err });

        return res.status(200).json({ message: "post deleted succefully" });
      });
    }
  });
};

export default deletePostController;
