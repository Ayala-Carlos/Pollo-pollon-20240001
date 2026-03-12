import express from "express"
import productsRoutes from "./src/models/products";

//Ejecutar express
const app = express();

app.use(express.json())

//Creamos los endpoints

app.use("/api/products", productsRoutes);

export default app;

