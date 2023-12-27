import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();
router.get("/", (req, res) => {
    res.render("home.hbs");
});

router.get("/products", async (req,res) => {
    const { limit, page, query, sort } = req.query;
    const products = await productDao.findProducts(limit, page, query, sort);

    res.render("products.hbs", {products})
})

router.get("/carts/:id", async (req,res) => {
    const { id } = req.params;
    const products = await cartDao.getProductsFromCart(id);
    console.log(products)
    res.render("cart.hbs", {products});
})

router.get("/chat", (req, res) => {
    res.render("chat.hbs");
});

export default router;