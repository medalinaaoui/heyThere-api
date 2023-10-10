import { db } from "../model/db.js";
const deletePostController = (req, res) => {
  const { user_id, post_id } = req.body;
  const q = "SELECT * FROM post WHERE user_id = ?";
  const deleteQ = "DELETE FROM post where id = ?";

  db.query(q, [user_id], (err, results) => {
    if (err) {
      return res.status(402).json({ error: err });
    } else if (results) {
      const wantedPost = results.find((p) => p.id === post_id);

      if (!wantedPost)
        return res.status(402).json({ message: "no post to delete" });
      db.query(deleteQ, [post_id], (err, result) => {
        if (err) return res.status(401).json({ error: err });

        return res.status(200).json({ message: "post deleted succefully" });
      });
    }
  });
};

export default deletePostController;
