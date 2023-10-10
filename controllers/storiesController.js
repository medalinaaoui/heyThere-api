import { db } from "../model/db.js";
const storiesController = (req, res) => {
  const q =
    "select s.*, u.username, u.profilePic  from stories s join users u on s.user_id = u.id WHERE s.created_at > NOW() - INTERVAL 1 DAY";
  db.query(q, (err, result) => {
    if (err) res.status(402).json(err);

    res.status(200).json(result);
  });
};
export default storiesController;
