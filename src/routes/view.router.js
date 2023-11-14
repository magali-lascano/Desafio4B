import { Router } from "express";
import ProductManager from "../../productmanager.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/product.json");

router.get("/", async(req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", async(req, res) => {
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
});

export default router;