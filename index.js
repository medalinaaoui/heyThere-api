import express from "express";
import usersRouter from "./routes/users/users.js";
import postsRouter from "./routes/posts/posts.js";
import userPostsRouter from "./routes/posts/userPosts.js";
import likesRouter from "./routes/likes/likes.js";
import commentsRouter from "./routes/comments/comments.js";
import registerRouter from "./routes/auth/register.js";
import loginRouter from "./routes/auth/login.js";
import logoutRouter from "./routes/auth/logout.js";
import refreshAccessTokenRouter from "./routes/auth/refreshAccessToken.js";
import verifyAccess from "./middlewares/verifyAccess.js";
import cookieParser from "cookie-parser";
import credentials from "./middlewares/credentials.js";
import corsOptions from "./config/corsOptions.js";
import addPostRouter from "./routes/posts/addPostRouter.js";
import addStoryRouter from "./routes/stories/addStoyRouter.js";
import addCommentRouter from "./routes/comments/addCommentRouter.js";
import addLikeRouter from "./routes/likes/addLike.js";
import storiesRouter from "./routes/stories/stories.js";
import allUsersRouter from "./routes/users/allUsers.js";
import allUsersfbRouter from "./routes/users/allUsersfb.js";
import sentFollowRouter from "./routes/users/sentFollow.js";
import updateProfileRouter from "./routes/users/updateProfile.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.use("/api/refresh/accesstoken", refreshAccessTokenRouter);
app.use(verifyAccess);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, file.originalname + "_" + uuidv4() + extname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
  console.log("Uploaded file:", file);
});
app.use("/api/addComment", addCommentRouter);
app.use("/api/addLike", addLikeRouter);
app.use("/api/addPost", addPostRouter);
app.use("/api/addStory", addStoryRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/users/update", updateProfileRouter);
app.use("/api/allUsers", allUsersRouter);
app.use("/api/allUsersfb", allUsersfbRouter);
app.use("/api/posts", postsRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/userPosts", userPostsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/sentFollow", sentFollowRouter);

const PORT = 8800;
app.listen(process.env.PORT || PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}`);
});
