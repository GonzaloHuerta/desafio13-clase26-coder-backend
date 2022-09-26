import { getAllProductsRep, getProductByIdRep, addProductRep, editProductByIdRep, deleteProductRep } from '../persistencia/repositories/productRepository.js';

const getAllProducts = getAllProductsRep;

const getProductById = getProductByIdRep;

const addProduct  = addProductRep;

const editProductById = editProductByIdRep;

const deleteProduct = deleteProductRep;

export {getAllProducts, getProductById, addProduct, editProductById, deleteProduct}