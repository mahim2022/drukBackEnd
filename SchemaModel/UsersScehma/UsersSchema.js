import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	email: { type: String, required: true },
	password: {
		type: String,
		required: true,
	},
	orders: [
		{
			orderId: { type: mongoose.Schema.Types.ObjectId },
			status: { type: mongoose.Schema.Types.String },
		},
	],
});

export const User = mongoose.model("User", UserSchema);
