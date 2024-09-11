import { Schema, model } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	date_of_birth: {
		type: Date,
		required: true,
	},
});

const User = model("Event", UserSchema);

export default User;
