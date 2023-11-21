import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
//Валидация
import { registerValidation } from "./validations/auth.js";
import { loginValidation } from "./validations/login.js";
import { postCreateNotesValidation } from "./validations/post.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://kseniakap096:9753124680_Ks@cluster0.l3so1oh.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connect"))
  .catch((err) => console.log("db error", err));

const app = express();
app.use(express.json());

app.use(cors());

//получение статичного файла
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Роутеры
// app.get(
//   "/login",
//   loginValidation,
//   handleValidationErrors,
//   UserController.login
// );
app.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.infoMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.post(
  "/posts",
  checkAuth,
  postCreateNotesValidation,
  handleValidationErrors,
  PostController.create
);
app.get("/tags", PostController.getTags);
app.get("/post/tags", PostController.getTags);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateNotesValidation,
  handleValidationErrors,
  PostController.update
);

app.get("/", (req, res) => {
  res.send("Привет!");
});
app.listen(3005, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
