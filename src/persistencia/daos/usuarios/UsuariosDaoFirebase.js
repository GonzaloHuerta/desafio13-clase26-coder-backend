import { ContenedorFirebase } from "../../containers/ContenedorFirebase.js";

export class UsuariosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("usuarios");
    }
}