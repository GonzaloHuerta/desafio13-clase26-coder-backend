import {logInfo} from '../loggers/logger.js';

export const obtenerNumerosRandom = (req, res)=>{
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
    console.log('Server connected');
    logInfo.info(`Ruta: ${req.path}api/randoms | Método ${req.method}`)
    res.send(objetoNumerosRandom);
}
