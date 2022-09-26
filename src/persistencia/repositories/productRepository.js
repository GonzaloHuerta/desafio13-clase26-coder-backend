import { productosDao as api } from '../../persistencia/daos/index.js';


const getAllProductsRep = async(req, res)=>{
    try{
        const productos = await api.getAll();
        productos? res.status(200).json(productos) : res.status(404).json({message: 'No hay productos disponibles'});
    }catch (err){
        res.status(500).json({message: err.message});
    } 
}

const getProductByIdRep = async(req, res)=>{
    const {id} = req.params;
    const product = await api.getById(id);
    res.json(product);
}

const addProductRep = async(req, res)=>{
    const obj = req.body;
    
    if(obj.nombre==undefined || obj.descripcion==undefined || obj.codigo==undefined || 
        obj.thumbnail==undefined || obj.precio==undefined || obj.stock ==undefined)
    {
        res.json({error: "No se puede agregar un objeto vacío"})
        return;
    }
    
    for(let key in obj){
        if(obj[key] == ''){
            res.json({error: "Debe completar todos los campos para la creacion del producto"})
            return;
        }
    }
    const product = await api.create(obj);
    res.json(product);
}

const editProductByIdRep = async(req, res)=>{
    const {id} = req.params;
    const {timestamp, nombre, descripcion, codigo, foto, precio, stock} = req.body;
    res.json(await api.editById(id, timestamp, nombre, descripcion, codigo, foto, precio, stock));
}

const deleteProductRep = async(req, res)=>{
    const {id} = req.params;
    res.json(await api.deleteById(id));
}

export {getAllProductsRep, getProductByIdRep, addProductRep, editProductByIdRep, deleteProductRep};