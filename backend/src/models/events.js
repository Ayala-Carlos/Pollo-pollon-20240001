import {Schema, model} from "mongoose";

const eventSchema = new Schema({
    customerName: {type: String},
    cantPieces: {type: Number},
    eventDate: {type: Date}
},{
    timestamps: true,
    strict: false
}
)

export default model("Event", eventSchema)