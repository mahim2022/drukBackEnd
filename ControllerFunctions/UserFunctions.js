import { User } from "../SchemaModel/UsersScehma/UsersSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
	const { name, phoneNumber, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(404).json({
				message: "User already exist ,Signin",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			name: name,
			phoneNumber: phoneNumber,
			email: email,
			password: hashedPassword,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, "test", {
			expiresIn: "1h",
		});
		res.status(201).json({ result, token });
	} catch (error) {
		res.status(404).json({ message: `Error in server ${error}` });
	}
};

export const SignIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(401).json({ message: "User doesnt exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(402).json({ message: "Password does'nt match" });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "1h" }
		);

		res.status(201).json({ result: existingUser, token });
	} catch (error) {
		res.status(404).json(error);
	}
};
