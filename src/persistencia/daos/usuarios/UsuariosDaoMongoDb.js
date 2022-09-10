import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { usuariosSchema } from "../../models/usuarios/usuariosSchema.js";

export class UsuariosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('usuarios', usuariosSchema);
    }
}