import Mailgun from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

const domain = process.env.MAILGUN_DOMAIN || "domainhere";

async function sendEmail(info) {
	try {
		const response = await mg.messages.create(domain, info);
	} catch (error) {
		console.error(error);
	}
}

export { sendEmail };
