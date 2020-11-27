import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(helmet());
app.use(morgan("common"));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.set("view engine", "ejs");

// connect to db
connectDB();

app.get("/", (req, res) => {
	res.send("Home route");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/register", (req, res) => {
	res.render("register");
});

app.use("/api/users", users);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
