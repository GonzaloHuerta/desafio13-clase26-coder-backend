import { ContenedorFirebase } from "../../containers/ContenedorFirebase.js";

export class MensajesDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes');
    }
}