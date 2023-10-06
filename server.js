import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Auth from "./routes/routes.js";

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "votre_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.locals.pretty = NODE_ENV !== "production";

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_success = req.flash("success");
  res.locals.flash_error = req.flash("error");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", Auth);

app.use("/register", Auth);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
