import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit, page, query, sort } = req.query;
        const products = await productDao.findProducts(limit, page, query, sort);
        res.json({
            data: products,
            message: "Product list"
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
});

router.post("/", async (req, res) => {
    try { 
        const product = await productDao.createProducts(req.body);
        res.json({
            product,
            message: "Product created"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productDao.updateProducts(id, req.body);

        res.json({
            product,
            message: "Product updated"
        });
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productDao.deleteProducts(id);

        res.json({
            product,
            message: "Product deleted"
        });
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
});

export default router;