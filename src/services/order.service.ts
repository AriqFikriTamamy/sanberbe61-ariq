import OrdersModel, {Order} from "../models/order.model";
import ProductsModel, { Product } from "../models/products.model";
import UsersModel, { User } from "../models/user.model";
import {SortOrder, Types} from "mongoose";

export const create = async (payload: Order): Promise<Order> => {
    const result = await OrdersModel.create(payload);
    return result;
};

// export interface IFindAll {
//   query?: unknown;
//   limit: number;
//   page: number;
// }

interface PopulatedOrder {
    grandTotal: number;
    orderItems: {
        name: string;
        price: number;
        qty: number;
        // _id: Types.ObjectId;
    }[];
    createdBy: {
        username: string;
        profilePicture: string;
    }[];
    status: string;
}

export const findAll = async (
    query: any,
    limit: number = 10,
    page: number = 1
): Promise<PopulatedOrder[]> => {
    const orders = await OrdersModel.find(query).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 }).populate({
        path: "orderItems",
        model: ProductsModel,
        select: "name price qty"
    }).populate({
        path: "createdBy",
        model: UsersModel,
        select: "username profilePicture"
    }) as unknown as (Order & { createdBy: User[] })[];
    // const users = await UsersModel.find(query).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 }).populate({
    //     path: "createdBy",
    //     model: ProductsModel,
    //     select: "username profilePicture"
    // });
    console.log(orders);
    const result: PopulatedOrder[] = orders.map(order => ({
        _id: order._id!.toString(),
        grandTotal: order.grandTotal,
        orderItems: order.orderItems.map(item => {
            const productItem = item as unknown as Product;
            return{
                name: productItem.name,
                productId: productItem._id.toString(),
                price: productItem.price,
                qty: productItem.qty,
            }
            // name: (item as unknown as {name: string; price: number; qty: number; _id: Types.ObjectId}).name,
            // productId: item._id.toString(),
            // price: (item as unknown as {name: string; price: number; qty: number; _id: Types.ObjectId}).price,
            // qty: (item as unknown as {name: string; price: number; qty: number; _id: Types.ObjectId}).qty
        },
    ),
    createdBy: order.createdBy.map((user: { username: any; profilePicture: any; }) => {
        // const userItem = item as unknown as User;
        return{
            username: user.username,
            profilePicture: user.profilePicture
        }
    }),
        status: order.status,
    }))
    return result;
};

export const findOne = async (id: string): Promise<Order | null> => {
    const result = await OrdersModel.findById(id);
    return result;
};

export const update = async (
    id: string,
    payload: Order
): Promise<Order | null> => {
    const result = await OrdersModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const remove = async (id: string): Promise<Product | null> => {
    const result = await ProductsModel.findOneAndDelete({
        _id: id,
    });
    return result;
};