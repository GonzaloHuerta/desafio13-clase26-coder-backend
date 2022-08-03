import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res)=>{
    const {cantidad} = req.query;
    let objetoNumerosRandom = {}
    let cant = cantidad ? cantidad : 10;

    for (let i = 0; i < cant; i++) {      //Puse 1000 en vez de 100.000.000 como dice la consigna para que no sea tanto
        let numeroAleatorio = 0;
        numeroAleatorio = Math.floor(Math.random() * (1000 - 1 + 1 ) + 1);
        let numeroString = numeroAleatorio.toString();
        objetoNumerosRandom[numeroString] = 0; 
    }

    let claves = Object.keys(objetoNumerosRandom);
    for (let i = 0; i < claves.length; i++) {
        if(objetoNumerosRandom.hasOwnProperty(claves[i])){
            objetoNumerosRandom[claves[i]]++
        }else{
            objetoNumerosRandom[claves[i]] = 1;
        }
        
    }
    
    console.log(objetoNumerosRandom)
    res.send({"mensaje": "CORRECTO"})    
})

export default router;