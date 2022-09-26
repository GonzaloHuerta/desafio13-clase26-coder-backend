import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { usuariosSchema } from "../../models/usuarios/usuariosSchema.js";

export class UsuariosDaoMongoDb extends ContenedorMongoDb{
    static instancia;
    constructor(){
        if(!UsuariosDaoMongoDb.instancia){
            super('usuarios', usuariosSchema);
            UsuariosDaoMongoDb.instancia = this;
        }
        else{
            return UsuariosDaoMongoDb.instancia;
        }
    }
}