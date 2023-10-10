import { db } from "../model/db.js";

const usersController = (req, res) => {
  const {
    username,
    email,
    full_name,
    coverPic,
    profilePic,
    bio,
    location,
    website,
    user_id,
  } = req.body;
  const q =
    "UPDATE users set username = ?, email = ?, full_name = ?, coverPic= ?, profilePic = ?, bio = ?, location = ?, website = ? where id = ?";

  db.query(
    q,
    [
      username,
      email,
      full_name,
      coverPic,
      profilePic,
      bio,
      location,
      website,
      user_id,
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "User data updated successfully" });
      }
    }
  );
};

export default usersController;
