import { ContenedorFirebase } from "../../containers/ContenedorFirebase.js";

export class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("productos");
    }
}