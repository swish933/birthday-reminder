import express from "express";
import dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
// import cookieParser from "cookie-parser";
import viewRouter from "./views/views.router.js";
import errorHandler from "./middleware/error.middleware.js";
import { connectToMongoDB } from "./database/connection.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import RedisStore from "connect-redis";
import redisClient from "./integrations/redis.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

connectToMongoDB();
redisClient.connect();

// Initialize store.
let redisStore = new RedisStore({
	client: redisClient,
	prefix: "myapp:",
});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		store: redisStore,
		resave: false,
		saveUninitialized: false,
		secret: "keyboard cat",
	})
);

app.use(flash());

app.use("/views", viewRouter);

app.get("/", function (req, res) {
	res.redirect("/views");
});

//Catch all route
app.all("*", (_req, res) => {
	res.status(404);
	res.json({
		message: "Not found",
	});
});

app.use(errorHandler);

app.listen(port, () => console.log(`Reminder listening on port ${port}!`));
