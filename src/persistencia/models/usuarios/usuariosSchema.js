import mongoose from "mongoose";

export const usuariosSchema = new mongoose.Schema({
    email: String,
    password: String
});
