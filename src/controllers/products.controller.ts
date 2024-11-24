/**
 * src/controllers/product.controller.ts
 */
import {Request, Response } from "express";

import {
  create,
  findAll,
  findOne,
  remove,
  update
} from "../services/product.service";
import { IPaginationQuery } from "../utils/interfaces";
import ProductsModel from "../models/products.model";
// import * as Yup from "yup";
import CategoriesModel from "../models/categories.model";

// const createValidationSchema = Yup.object().shape({
//   name: Yup.string().required(),
//   price: Yup.number().required(),
//   categoryId: Yup.string().required(),
//   description: Yup.string().required(),
//   images: Yup.array().of(Yup.string()).required().min(1),
//   qty: Yup.number().required().min(1),
// })

export default {
  async create(req: Request, res: Response) {
    try {
      // await createValidationSchema.validate(req.body);
      const result = await create(req.body);
    //   const { categoryId, name, description, images, price, qty } = req.body;
    //   const productResult = await ProductsModel.create({
    //     name,
    //     description,
    //     images,
    //     price,
    //     qty,
    //     categoryId, 
    //   });
    //   const category = await CategoriesModel.findById(categoryId).select('_id name createdAt updatedAt __v');
    //   const responseData = {
    //     ...productResult.toObject(), 
    //     categoryId: category ? { _id: category._id, name: category.name, createdAt: category.createdAt, updatedAt: category.updatedAt, __v: category.__v } : null // Menyertakan informasi kategori
    // };
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      // if(error instanceof Yup.ValidationError){
      //   res.status(400).json({data: error.errors, message: "Failed create product"});
      //   return;
      // }
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      // const {
      //   limit = 10,
      //   page = 1,
      //   search = "",
      // } = req.query as unknown as IPaginationQuery;

      const query = {};

      // if (search) {
      //   Object.assign(query, {
      //     name: { $regex: search, $options: "i" },
      //   });
      // }
      const result = await findAll(query);
      // const total = await ProductsModel.countDocuments(query);
      res.status(200).json({
        data: result,
        message: "Success get all products",
        // page: +page,
        // limit: +limit,
        // total,
        // totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all products",
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const result = await findOne(req.params?.id);

      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await update(req.params?.id, req.body);

      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await remove(req.params?.id);

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};
