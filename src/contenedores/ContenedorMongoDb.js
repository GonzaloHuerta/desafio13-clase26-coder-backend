import mongoose from 'mongoose';
import 'dotenv/config';

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
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const contenido = await this.collection.find({});
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const contenido = await this.collection.find({id: id})
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const nuevo = await this.collection.create(obj);
            return nuevo;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const borrado = await this.collection.deleteOne({id: id});
            return borrado;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try{
            const actualizado = await this.collection.findByIdAndUpdate(id, obj);
            return actualizado;
        }catch(error){
            console.log(error);
        }
    }
}

export default ContenedorMongoDb;