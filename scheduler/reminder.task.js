import cron from "node-cron";
import { connectToMongoDB } from "../database/connection.js";
import UserModel from "../database/users.schema.js";
import { sendEmail } from "../integrations/mailgun.js";

const sendReminders = async () => {
	try {
		const reminders = await UserModel.aggregate([
			{
				$match: {
					$expr: {
						$and: [
							{
								$eq: [
									{ $dayOfMonth: "$date_of_birth" },
									{ $dayOfMonth: new Date() },
								],
							},
							{ $eq: [{ $month: "$date_of_birth" }, { $month: new Date() }] },
						],
					},
				},
			},
		]);

		if (!reminders.length) {
			console.log("No reminders right now");
			return;
		}

		for (const reminder of reminders) {
			sendEmail({
				from: "Doofenshmirtz Evil Inc.",
				to: `${reminder.email}`,
				subject: `Happy Birthday!`,
				template: "birthday_reminder",
				"t:variables": JSON.stringify({
					title: `Happy Birthday ${reminder.username}!`,
				}),
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error(error.message, 500);
	}
};

console.log("Scheduler running...");

connectToMongoDB();

cron.schedule("0 7 * * *", sendReminders);
