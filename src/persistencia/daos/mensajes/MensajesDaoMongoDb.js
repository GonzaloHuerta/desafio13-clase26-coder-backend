import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { mensajesSchema } from "../../models/mensajes/mensajesSchema.js";

export class MensajesDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('mensajes', mensajesSchema);
    }
}