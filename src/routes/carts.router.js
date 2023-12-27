import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async(req, res) => {
    try {
        const carts = await cartDao.findCarts();
        res.json({
            data: carts,
            message: "Carts list"
        })
    }
    catch(error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.post("/", async(req, res) => {
    try {
        const cart = await cartDao.createCart(req.body);
        res.json({
            cart,
            message: "Cart created"
        })
    }
    catch(error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
  
    try {
      const result = await cartDao.updateCartWithProducts(cid, products);
      res.json({
        result,
        message: "Cart updated"
        })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
  
    try {
      const result = await cartDao.deleteAllProductsFromCart(cid);
      res.json({
        result,
        message: "Products deleted"
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const result = await cartDao.addProductCart(cid, pid);
        res.json({
            result,
            message: "Product added"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:cid/products/:pid', async (req,res)=>{
    const { cid, pid } = req.params;
  const { quantity } = req.body;
    try {
    const result = await cartDao.updateProductQuantity(cid, pid, quantity);
    res.json({
        result,
        message: "Product updated"
    });
    } catch (error) {
     res.status(500).json({ error: error.message });
    } 
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const result = await cartDao.deleteProductFromCart(cid, pid);
      res.json({
        result,
        message: "Product deleted"
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

export default router;