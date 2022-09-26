export default class ProductoDto{
    constructor({nombre, descripcion, codigo, thumbnail, precio, stock}){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.thumbnnail = thumbnail;
        this.precio = precio;
        this.stock = stock;
    }
}

export function activarDTO(param){
    if(Array.isArray(param)){
        return param.map(producto=>new ProductoDto(producto));
    }
    else{
        return new ProductoDto(param);
    }
}