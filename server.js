import express from 'express';
import handlebars from 'express-handlebars';
import { productsRouter } from './src/routes/products';
import { cartsRouter } from './src/routes/cart';
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./productmanager.js";

const productManager = new ProductManager(__dirname + "/product.json");

//port
const PORT = 8080
//express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// socket server
const socketServer = new Server(httpServer);

socketServer.on("Coneccion", (socket) => {
    console.log(`Cliente connectado: ${socket.id}`);
    socket.on(`Desconectar`, () => {
        console.log(`Cliente desconectado: ${socket.id}`); // log para cuando se cae la comunicación
    });
    socket.on("newproduct", (newProduct) => {
        console.log(`Producto agregado: ${newProduct}`);
        productManager.addProduct({...newProduct });
    });
    socket.on("deleteProduct", (productId) => {
        console.log(`Producto borrado ${productId}`);
        productManager.deleteProductById(productId);
    });
});

// port
app.listen(PORT, () => {
    console.log(`Server activo en puerto ${PORT}`);
});
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});