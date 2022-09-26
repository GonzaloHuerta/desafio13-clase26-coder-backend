import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { mensajesSchema } from "../../models/mensajes/mensajesSchema.js";

export class MensajesDaoMongoDb extends ContenedorMongoDb{
    static instancia;
    constructor(){
        if(!MensajesDaoMongoDb.instancia){
            super('mensajes', mensajesSchema);
            MensajesDaoMongoDb.instancia = this;
        }
        else{
            return MensajesDaoMongoDb.instancia;
        }
    }
}