import { db } from "../model/db.js";

const addPostController = (req, res) => {
  const { user_id, content, img } = req.body;
  const q = "insert into post(user_id, content, img) value(?, ?, ?)";

  db.query(q, [user_id, content, img], (err, results) => {
    if (err) res.status(402).json({ error: err });
    if (!err) res.status(200).json({ message: "post added successfully" });
  });
};

export default addPostController;
