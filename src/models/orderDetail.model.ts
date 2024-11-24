import mongoose, { Types } from "mongoose";

export interface orderDetail {
    product: Types.ObjectId;
    qty: string;
    subTotal: number;
    // qty: number;
    order: Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    _id?: Types.ObjectId;
}