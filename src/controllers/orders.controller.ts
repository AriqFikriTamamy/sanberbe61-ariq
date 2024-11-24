import {Request, Response } from "express";
import { create, findAll, findOne, update, remove } from "../services/order.service";


export default {
    async create(req: Request, res: Response){
        try{
            const result = await create(req.body);
            res.status(201).json({
                data: result,
                message: "Success create order"
            })
        }catch(error){
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create order",
            });
        }
    },
    async findAll(req: Request, res: Response){
        try{
            const query = {};
            const result = await findAll(query);
            res.status(200).json({
                data: result,
                message: "Success get all orders",
            });
        }catch(error){
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all orders",
            });
        }
    },
    async findOne(req: Request, res: Response) {
        try {
            const result = await findOne(req.params?.id);
            res.status(200).json({
                data: result,
                message: "Success get a order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get a order",
            });
        }
    },
    async update(req: Request, res: Response) {
        try {
            const result = await update(req.params?.id, req.body);
            res.status(200).json({
                data: result,
                message: "Success update data order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed update data order",
            });
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const result = await remove(req.params?.id);
            res.status(200).json({
                data: result,
                message: "Success delete data order",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed delete data order",
            });
        }
    },
}