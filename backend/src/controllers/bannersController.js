import bannerModel from "../models/banners.js";
import { v2 as cloudinary } from "cloudinary";

const bannerController = {};

// SELECT ALL
bannerController.getAllBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find();
        return res.status(200).json(banners);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// INSERT (CORREGIDO)
bannerController.insertBanner = async (req, res) => {
    try {
        // 1. Extraemos las variables del body (¡Faltaba esto!)
        const { title, subtitle } = req.body;

        // Validamos que venga un archivo
        if (!req.file) {
            return res.status(400).json({ message: "La imagen es requerida" });
        }

        const newBanner = new bannerModel({
            title,
            subtitle,
            image: req.file.path,
            public_id: req.file.filename
        });

        // 2. Guardamos en la base de datos (sin el 200 adentro)
        await newBanner.save();

        // 3. Respondemos al cliente con éxito (¡Faltaba esto!)
        return res.status(201).json({ message: "Banner creado con éxito", newBanner });

    } catch (error) {
        console.log("error " + error);
        // 4. Corregido: de 'resizeTo' a 'res'
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE
bannerController.deleteBanner = async (req, res) => {
    try {
        const bannerFound = await bannerModel.findById(req.params.id);
        if (!bannerFound) {
            return res.status(404).json({ message: "Banner no encontrado" });
        }

        await cloudinary.uploader.destroy(bannerFound.public_id);
        await bannerModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Banner deleted" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE (Nota el cambio de nombre a singular 'updateBanner')
bannerController.updateBanner = async (req, res) => {
    try {
        const { title, subtitle } = req.body;
        const bannerFound = await bannerModel.findById(req.params.id);
        
        if (!bannerFound) {
            return res.status(404).json({ message: "Banner no encontrado" });
        }

        const updateData = { title, subtitle };

        if (req.file) {
            await cloudinary.uploader.destroy(bannerFound.public_id);
            updateData.image = req.file.path;
            updateData.public_id = req.file.filename;
        }

        const updatedBanner = await bannerModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        return res.status(200).json({ message: "Banner updated", updatedBanner });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default bannerController;