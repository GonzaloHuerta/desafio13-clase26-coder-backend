import {Router} from 'express';

const router = Router();

router.get('/', (req, res)=>{
    const {cantidad} = req.query;
    let objetoNumerosRandom = {}
    let cant = cantidad ? cantidad : 1000;

    for (let i = 0; i < cant; i++) {      //Puse 1000 en vez de 100.000.000 como dice la consigna para que no sea tanto
        let numeroAleatorio = Math.floor(Math.random() * (1000 - 0 + 1 ) + 0);
        
        if(objetoNumerosRandom[numeroAleatorio]){
            objetoNumerosRandom[numeroAleatorio]++
        }else{
            objetoNumerosRandom[numeroAleatorio] = 1
        }
    }
    console.log('Server connected')
    res.send(objetoNumerosRandom);
})

export default router;