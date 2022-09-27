import chai from 'chai';
import request from 'supertest';
import { ProductosDaoMongoDb } from '../persistencia/daos/productos/ProductosDaoMongoDb.js';

const expect = chai.expect;
const assert = chai.assert;

//correr tests con npm run test

describe('PROBANDO METODOS HTTP', ()=>{
    describe('GET', ()=>{
        it('status 200', async()=>{
            const respuesta = await request('http://localhost:8081').get('/products');
            expect(respuesta.status).to.eql(200)
        })
        it('length correcto', async()=>{
            const respuesta = await request('http://localhost:8081').get('/products');
            expect(respuesta.body).to.have.lengthOf(2);
        })
    })
    describe('POST', ()=>{
        it('status 200', async()=>{
            const respuesta = await request('http://localhost:8081').post('/products');
            expect(respuesta.status).to.eql(200)
        })
    })
    describe('DELETE', ()=>{
        it('status 200', async()=>{
            const respuesta = await request('http://localhost:8081').delete('/products/:id');
            expect(respuesta.status).to.eql(200)
        })
    })
    describe('PUT', ()=>{
        it('status 200', async()=>{
            const respuesta = await request('http://localhost:8081').put('/products/:id');
            expect(respuesta.status).to.eql(200)
        })
    })
})

describe('PROBANDO RESPUESTAS', ()=>{
    describe('PRUEBAS GETPRODUCTOS', ()=>{
        it('OBTENER TODOS LOS PRODUCTOS', async()=>{
            const productosClase = new ProductosDaoMongoDb();
            productosClase.getAll().then(
                function(res){
                    assert.lengthOf(res, 2)
                },
                function(err){
                    done(err)
                }
            );
        })
    })
    describe('PRUEBAS ADDPRODUCT', ()=>{
        it('AGREGAR PRODUCTO', async()=>{
            const producto = {
                nombre: 'Macbook',
                descripcion: 'Notebook Macbook pro 13',
                codigo: '2258',
                thumbnail: 'http://apple.com',
                precio: 2800,
                stock: 19
            }

            const productosClase = new ProductosDaoMongoDb();
            productosClase.create(producto).then(
                function(res){
                    assert.equal(producto)
                },
                function(err){
                    done(err)
                }
            );
        })
    })
    describe('PRUEBAS DELETEPRODUCT', ()=>{
        it('BORRAR PRODUCTO', async()=>{
            const productosClase = new ProductosDaoMongoDb();
            productosClase.deleteById('633247d59543ec8353f66eda').then(
                function(res){
                    assert.equal(productosClase.getById('633247d59543ec8353f66eda'))
                },
                function(err){
                    done(err)
                }
            );
        })
    })
    describe('PRUEBAS PUTPRODUCT', ()=>{
        const producto = {
            nombre: 'Macbook',
            descripcion: 'Notebook Macbook pro 13',
            codigo: '2258',
            thumbnail: 'http://apple.com',
            precio: 2800,
            stock: 19
        }
        it('MODIFICAR PROODUCTO', async()=>{
            const productosClase = new ProductosDaoMongoDb();
            productosClase.update('633247d59543ec8353f66eda', producto).then(
                function(res){
                    assert.equal(producto)
                },
                function(err){
                    done(err)
                }
            );
        })
    })
    
})