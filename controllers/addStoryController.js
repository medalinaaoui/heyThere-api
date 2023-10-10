import { db } from "../model/db.js";

const addPostController = (req, res) => {
  const { user_id, img } = req.body;
  const q = "insert into stories(user_id, img) value(?, ?)";

  db.query(q, [user_id, img], (err, results) => {
    if (err) res.status(402).json({ error: err });
    if (!err) res.status(200).json({ message: "story added successfully" });
  });
};

export default addPostController;
