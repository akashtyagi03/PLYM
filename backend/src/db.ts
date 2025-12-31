import { Schema, model } from "mongoose"; 

const userschema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const BuildstatusSchema = new Schema(
   { 
    status : { type: String, required: true},
    frontend_progress: {type: Number, required: true},
   },
    { timestamps: true }
)

const featuresSchema = new Schema(
    {
        name : {type: String, required: true},
        audience: {type: String, required: true},
        state: {type: String, required: true},
    },
    { timestamps: true }
)

export const Features = model("Features", featuresSchema)
export const Buildstatus = model("Buildstatus", BuildstatusSchema)
export const User = model("User", userschema);