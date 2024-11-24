import { Request, Response } from "express";
import { create, findAll, findOne, update, remove } from "../services/user.service";

export default {
    async create(req: Request, res: Response){
        try{
            const result = await create(req.body);
            res.status(201).json({
                data: result,
                message: "Success create user"
            })
        }catch(error){
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create user",
            });
        }
    },
    async findAll(req: Request, res: Response){
        try{
            const query = {};
            const result = await findAll(query);
            res.status(200).json({
                data: result,
                message: "Success get all users",
            });
        }catch(error){
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all users",
            });
        }
    },
    async findOne(req: Request, res: Response) {
        try {
            const result = await findOne(req.params?.id);
            res.status(200).json({
                data: result,
                message: "Success get a user",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get a user",
            });
        }
    },
    async update(req: Request, res: Response) {
        try {
            const result = await update(req.params?.id, req.body);
            res.status(200).json({
                data: result,
                message: "Success update data user",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed update data user",
            });
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const result = await remove(req.params?.id);
            res.status(200).json({
                data: result,
                message: "Success delete data user",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed delete data user",
            });
        }
    },
}