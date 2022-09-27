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
    if(product){
        res.json(product);
    }else{
        res.json({error: 'No existe producto con ese id'})
    }
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
    const editedProduct = await api.update(id, req.body);
    if(editedProduct){
        res.json(editedProduct);
    }else{
        res.json({error: 'No se pudo editar el producto'})
    }
}

const deleteProductRep = async(req, res)=>{
    const {id} = req.params;
    const deletedProduct = await api.deleteById(id);
    if (deletedProduct){
        res.json(await api.deleteById(id));
    }else{
        res.json({error: "No existe producto con ese id"});
    }
    
}

export {getAllProductsRep, getProductByIdRep, addProductRep, editProductByIdRep, deleteProductRep};