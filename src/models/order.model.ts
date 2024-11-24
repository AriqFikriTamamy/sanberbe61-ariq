import mongoose, { Types } from "mongoose";

enum OrderStatus{
    Pending = 'pending',
    Completed = 'completed',
    Canceled = 'canceled',
}

export interface Order extends Document {
    grandTotal: number;
    orderItems: Types.ObjectId[];
    createdBy: Types.ObjectId[];
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    _id?: Types.ObjectId;
}

const Schema = mongoose.Schema;

const OrderSchema = new Schema<Order>(
    {
        grandTotal: {
            type: Schema.Types.Number,
            required: true
        },
        orderItems: [{
            type: Schema.Types.ObjectId,
            ref: "Products",
        }],
        createdBy: [{
            type: Schema.Types.ObjectId,
            ref: "Users",
        }],
        status: {
            type: Schema.Types.String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Pending
        }
    },
    {
        timestamps: true,
    }
);

const OrdersModel = mongoose.model<Order>("Orders", OrderSchema);

export default OrdersModel;