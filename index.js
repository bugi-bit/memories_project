import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(
//   "/static",
//   express.static(path.join(`./${__dirname}/client/build/static`))
// );
// dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.get("/", (req, res) => {
//   res.sendFile(path.join(`./${__dirname}/client/build/static`));
// });

// const CONNECTION_URL = "mongodb://127.0.0.1:27017";
const CONNECTION_URL =
  "mongodb+srv://jantenanmac:j4nt3n4n@cluster0.s1ztu.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8000;

try {
  await mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    );
} catch (error) {
  console.log(error);
}

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => console.log(error));

// app.listen(PORT, () => {
//   console.log("server running");
// });
