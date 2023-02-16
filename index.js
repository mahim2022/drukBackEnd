import postFunctions from "./routes/postRoutes.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {
	MenuItem,
	OrderList,
	ProcessedOrder,
} from "./SchemaModel/RestaurantsSchema.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(
	cors({
		// origin: "https://modpanda.netlify.app",
		origin: "*",
	})
);

/////for getting store data///
app.use("/post", postFunctions);
////for getting customerUserData///
app.use("/customer", userRoutes);
app.get("/", (req, res) => {
	res.send("Hello to DRUK_API");
});

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
// 	cors: { origin: ["http://localhost:3000"] },
// });

// io.on("connection", (socket) => {
// 	MenuItem.watch().on("change", (change) => {
// 		socket.emit("menuUpdate");
// 	});
// 	OrderList.watch().on("change", (change) => {
// 		socket.emit("newOrder");
// 	});
// 	ProcessedOrder.watch().on("change", (change) => {
// 		socket.emit("orderUpdate");
// 	});
// });

// httpServer.listen(port);

///////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// mongoose
// 	.connect(process.env.CONNECTION_URL)
// 	.then(() =>
// 		// httpServer.listen(port, () => {
// 		// 	console.log(`mongooseIndex and socketIO on port ${port}`);
// 		// })
// 		console.log(`mongo running on port ${port}`)
// 	)
// 	.catch((error) =>
// 		console.log(`Mongo db is disconnected with error=>{${error}}`)
// 	);

app.listen(port, () => {
	mongoose
		.connect(process.env.CONNECTION_URL)
		.then(() =>
			// httpServer.listen(port, () => {
			// 	console.log(`mongooseIndex and socketIO on port ${port}`);
			// })
			console.log(`app and mongo running on port ${port}`)
		)
		.catch((error) =>
			console.log(`Mongo db is disconnected with error=>{${error}}`)
		);
});
