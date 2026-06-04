import deliveryDriversModel from "../models/deliveryDrivers.js"

import {v2 as cloudinary} from "cloudinary"

//Array de funciones
const deliveryDriversController = {};

//Select 
deliveryDriversController.getAllDrivers = async (req, res) => {
    try {
        const drivers = await deliveryDriversModel.find();
        return res.status(200).json(drivers);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Error al obtener los conductores"});
    }
}

//Select by id
deliveryDriversController.getDriverById = async (req, res) => {
    try{
        const driver = await deliveryDriversModel.findById(req.params.id)

        if(!drivers){
            return res.status(404).json({message: "Not found"})
        }

        return res.status(200).json(driver)

    }catch (error){
        console.log("error "+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Insert
deliveryDriversController.insertDrivers = async (req, res) => {
    try{
        //1 - Solicito los datos a guardar
        const{name, phone, cars, isActive} = req.body

        //LLenar modelo con lpos datos que me mandan
        const newDriver = new deliveryDriversModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        //Guardo todo en la base de datos
        await newDriver.save()
        return res.status(200).json({message: "Driver save"})
    }catch(error){
        console.log("error "+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Eliminar
deliveryDriversController.deleteDrivers = async (req, res) => {
    try{
        //Buscamos el repartidor a eliminar
        const driverFound = await deliveryDriversModel.findById(req.params.id)

        //Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(driverFound.public_id)

        //Eliminar de la base de datos
        const driverDeleted = await deliveryDriversModel.findByIdAndDelete(req.params.id)

        if(!driverDeleted){
            return res.status(404).json({message: "Driver not found"})
        }
        
        return res.status(204).json({message: "Driver deleted"})

    }catch(error){
        console.log("error "+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Update
deliveryDriversController.updateDriver = async (req, res) => {
    try{

        //1- Solicito los nuevos datos
        const {name, phone, cars, isActive} = req.body

        //Identificar que repartidor vamos a actualizar
        const driverFound = await deliveryDriversModel.findById(req.params.id)

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        //Si llega a venir una imagen la actualizo
        if(req.file){
            //Eliminar la imagen anterior
            await cloudinary.uploader.destroy(driverFound.public_id)

            updatedData.image = req.file.path
            updatedData.public_id = req.file.filename
        }

        //Guardo todo lo actualizado en la base de datos
        await deliveryDriversModel.findByAndUpdated(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).json({message: "Driver updated"})

    }catch (error){
        console.log("error: "+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default deliveryDriversController;