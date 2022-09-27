import mongoose from 'mongoose';
import 'dotenv/config';
import { activarDTO } from '../dto/productos/productosDto.js';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.o7pgm.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`);

class ContenedorMongoDb{
    constructor(collName, docSchema){
        this.collection = mongoose.model(collName, docSchema);
    }

    async getByEmail(email){
        try {
            const contenido = await this.collection.findOne({email: email});
            return activarDTO(contenido);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const contenido = await this.collection.find({});
            return activarDTO(contenido);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const contenido = await this.collection.findById(id)
            if(contenido){
                return activarDTO(contenido);
            }else{
                console.log("No existe el producto")
            }
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const nuevo = await this.collection.create(obj);
            return activarDTO(nuevo);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const borrado = await this.collection.findByIdAndDelete(id);
            if(borrado){
                return activarDTO(borrado);
            }else{
                console.log("No existe producto")
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try{
            const actualizado = await this.collection.findByIdAndUpdate(id, obj);
            console.log(actualizado)
            if(actualizado){
                return activarDTO(actualizado);
            }else{
                console.log("No se pudo actualizar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

export default ContenedorMongoDb;