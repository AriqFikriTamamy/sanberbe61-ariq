import express from "express";

import uploadMiddleware from "../middlewares/upload.middleware";
import uploadController from "../controllers/upload.controller";
import productsController from "../controllers/products.controller";
import categoriesController from "../controllers/categories.controller";
import ordersController from "../controllers/orders.controller";
import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/orders", ordersController.findAll);
router.post("/orders", ordersController.create);
router.get("/orders/:id", ordersController.findOne);
router.put("/orders/:id", ordersController.update);
router.delete("/orders/:id", ordersController.delete);

router.get("/users", usersController.findAll);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.findOne);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

export default router;
