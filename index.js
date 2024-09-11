import express from "express";
import dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import viewRouter from "./views/views.router.js";
import errorHandler from "./middleware/error.middleware.js";
import { connectToMongoDB } from "./database/connection.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use(cookieParser("secret"));
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
