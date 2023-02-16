import mongoose from "mongoose";
const barModel = new mongoose.Schema({
	barName: { type: String },
	location: { type: String },
});

const menuItem = new mongoose.Schema({
	barId: { type: mongoose.Schema.Types.ObjectId },
	itemName: { type: String },
	vol: { type: mongoose.Schema.Types.Number },
	price: { type: mongoose.Schema.Types.Number },
	image: { type: String },
});

const orderListSchema = new mongoose.Schema(
	{
		barId: { type: mongoose.Schema.Types.ObjectId },
		customerId: { type: mongoose.Schema.Types.ObjectId },
		// orderDate: { type: mongoose.Schema.Types.Date },
		total: { type: mongoose.Schema.Types.Number },
		address: { type: String },
		paymentType: { type: String },
		orderStatus: { type: String },
		items: [
			{
				itemId: { type: mongoose.Schema.Types.ObjectId },
				itemName: { type: String },
				vol: { type: mongoose.Schema.Types.Number },
				count: { type: mongoose.Schema.Types.Number },
			},
		],
	},
	{ timestamps: true }
);

const ProcessedOrderSchema = new mongoose.Schema(
	{
		customerId: { type: mongoose.Schema.Types.ObjectId },
		invoiceId: { type: mongoose.Schema.Types.ObjectId },
		orderStatus: { type: String },
		items: [
			{
				itemName: { type: mongoose.Schema.Types.String },
				count: { type: Number },
			},
		],
	},
	{ timestamps: true }
);

///////Automatic deletion after 10 mins///////
// ProcessedOrderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1200 });

export const Bar = mongoose.model("Bar", barModel);
export const MenuItem = mongoose.model("MenuItem", menuItem);
export const OrderList = mongoose.model("OrderList", orderListSchema);
export const ProcessedOrder = mongoose.model(
	"ProcessedOrder",
	ProcessedOrderSchema
);
