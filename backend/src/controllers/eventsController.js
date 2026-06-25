import eventModel from "../models/events.js";

const eventController = {}

//Select

eventController.getEvents = async (req, res) => {
    try {
        //Solicitar en que pagina estamos
        //y cual es el limite de datos a mostrar
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await eventModel.countDocuments();

        const events = await eventModel.find().skip(skip).limit(limit);

        return res.status(200).json({events})

    } catch (error) {
        console.log("Error getting events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Insert
eventController.insertEvent = async (req, res) => {
    try {
        //#1- Solicito los datos a guardar
        const {customerName, cantPieces, eventDate} = req.body;

        //#2- LLenar el modelo con estos datos
        const newEvent = new eventModel({
            customerName,
            cantPieces,
            eventDate
        });

        //#3- Guardar el evento en la base de datos
        await newEvent.save();

        return res.status(201).json({ message: "Event inserted successfully" });

    } catch (error) {
        console.log("Error inserting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Delete
eventController.deleteEvent = async (req, res) => {
    try {
        await eventModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Update
eventController.updateEvent = async (req, res) => {
    try {
        const {customerName, cantPieces, eventDate} = req.body;

        await eventModel.findByIdAndUpdate(req.params.id, {
            customerName,
            cantPieces,
            eventDate
        });
        return res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        console.log("Error updating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}  

export default eventController;