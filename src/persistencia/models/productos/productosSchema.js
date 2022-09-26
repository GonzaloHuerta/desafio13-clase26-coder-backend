import mongoose from "mongoose";

export const productosSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    thumbnail: String,
    precio: Number,
    stock: Number
});