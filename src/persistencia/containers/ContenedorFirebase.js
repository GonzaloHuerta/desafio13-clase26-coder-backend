import admin from 'firebase-admin';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import dotenv from "dotenv";
dotenv.config();
//import serviceAccount  from '../serviceAccountKey.json';
//const serviceAccount = require('../serviceAccountKey.json'); 

const serviceAccount = {
    "type": process.env.SAK_TYPE,
    "project_id": process.env.SAK_PROJECT_ID,
    "private_key_id": process.env.SAK_PRIVATE_KEY_ID,
    "private_key": process.env.SAK_PRIVATE_KEY.replace(/\n/gm, "\n"),
    "client_email": process.env.SAK_CLIENT_EMAIL,
    "client_id": process.env.SAK_CLIENT_ID,
    "auth_uri": process.env.SAK_AUTH_URI,
    "token_uri": process.env.SAK_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.SAK_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.SAK_CLIENT 
  }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export class ContenedorFirebase{
    constructor(collName){
        this.db = admin.firestore();
        this.collection = this.db.collection(collName);
    }

    async getAll(){
        try {
            const contenido = await this.collection.get();
            return contenido.docs.map(doc=>doc.data())
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const contenido = await this.collection.doc(id).get();
            return contenido.data();
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const nuevo = await this.collection.add(obj);
            return this.getById(nuevo.id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const borrado = await this.collection.doc(id).delete();
            return borrado;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const actualizado = await this.collection.doc(id).update(obj);
            return actualizado;
        } catch (error) {
            console.log(error);
        }
      }
}