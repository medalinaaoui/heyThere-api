import { db } from "../model/db.js";

const userPostsController = (req, res) => {
  const userId = req.params.userId;
  const q =
    "SELECT p.id AS postId, p.content, p.created_at, p.img, u.id AS userId, u.username, u.profilePic, COALESCE(l.likeCount, 0) AS postsLikes, COALESCE(c.commentCount, 0) AS postsCommentsNumber FROM post AS p INNER JOIN users AS u ON p.user_id = u.id LEFT JOIN (SELECT post_id, COUNT(id) AS likeCount FROM likes GROUP BY post_id) AS l ON p.id = l.post_id LEFT JOIN (SELECT post_id, COUNT(id) AS commentCount FROM comments GROUP BY post_id) AS c ON p.id = c.post_id where u.id = ? order by p.created_at DESC";
  db.query(q, [userId], (err, result) => {
    if (err) return res.status(403).json({ error: err });

    res.status(200).json(result);
  });
};

export default userPostsController;
