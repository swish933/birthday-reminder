import express from "express";
import { addCustomer } from "../services/user.service.js";

const router = express.Router();

router.get("/", (_req, res) => {
	res.render("index", { messages: undefined });
});

router.get("/response", (req, res) => {
	res.render("index", { messages: req.flash("msg") });
});

router.post("/", async (req, res) => {
	const { email, username, date_of_birth } = req.body;

	const data = { email, username, date_of_birth: new Date(date_of_birth) };

	try {
		const response = await addCustomer(data);
		req.flash("msg", ["success", `Customer: ${response.email} added`]);
		res.redirect("/views/response");
	} catch (error) {
		req.flash("msg", ["error", "Server error"]);
		res.redirect("/views/response");
	}
});

export default router;
