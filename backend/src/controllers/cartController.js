import cartModel from "../models/cart.js";
import productsModel from "../models/products.js";

//Array de funciones
const cartController = {};

//Select
cartController.getAllCarts = async (req, res) => {
    try{
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("productId", "name");

        return res.status(200).json(carts);
    }catch(error){
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

//select by id
cartController.getCartById = async (req, res) => {
    try{
        const cart = await cartModel.findById(req.params.id)
        .populate("customerId", "name email")
        .populate("productId", "name");
        return res.status(200).json(cart);
    }catch(error){
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

//Insert
cartController.insertCart = async (req, res) => {
    try{
        //#1 - Solicito los datos a guardar
        const { customerId, products, status } = req.body;

        //Variable para guardar el total del carrito
        let total = 0;

        //Arreglo newProducts para guardar los productos con su subtotal
        const newProducts = [];
        for (let i=0; i < products.length; i++) {
            //Buscar el producto en la base de datos
            const productFound = await productsModel.findById(products[i].productId);

            //Calcular el subtotal
            const subtotal = productFound.price * products[i].quantity;
            total += subtotal;

            //Guardamos el producto justo con el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal
            });
        }

        //Llenamos el modelo
        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total,
            status
        });

        //Guardamos en la base de datos
        await newCart.save();

        return res.status(201).json({message: "Carrito creado con éxito", newCart});

    }catch(error){
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

//Update
cartController.updateCart = async (req, res) => {
    try{
        const { customerId, products, status } = req.body;
        let total = 0;

        let newProducts = [];

        for (let i=0; i < products.length; i++) {
            const productFound = await productsModel.findById(products[i].productId);

            const subtotal = productFound.price * products[i].quantity;
            total += subtotal;

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal
            });
        }

        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                customerId,
                products: newProducts,
                total,
                status
            },
            { new: true }
        );

        return res.status(200).json({message: "Carrito actualizado con éxito", updatedCart});

    }catch(error){
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

//Delete
cartController.deleteCart = async (req, res) => {
    try{
        const cartFound = await cartModel.findById(req.params.id);
        if(!cartFound){
            return res.status(404).json({message: "Carrito no encontrado"});
        }

        await cartModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Carrito eliminado con éxito"});
    }catch(error){
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default cartController;