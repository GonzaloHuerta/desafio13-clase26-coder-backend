import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { productosSchema } from "../../models/productos/productosSchema.js";

export class ProductosDaoMongoDb extends ContenedorMongoDb{
    static instancia;
    constructor(){
        if(!ProductosDaoMongoDb.instancia){
            super('productos', productosSchema);
            ProductosDaoMongoDb.instancia = this;
        }
        else{
            return ProductosDaoMongoDb.instancia;
        } 
    }

    getInstance(){
        if(!instancia){
            instancia = new ProductosDaoMongoDb();
        }
        return instancia;
    }
}