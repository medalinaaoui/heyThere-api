import { db } from "../model/db.js";

const likesController = (req, res) => {
  const postLikersId = req.params.postLikersId;
  const q = "select post_id from likes where user_id = ?";

  db.query(q, [postLikersId], (err, result) => {
    if (err) return res.status(402).json({ error: err });

    return res.status(200).json(result);
  });
};

export default likesController;
