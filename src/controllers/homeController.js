import {logInfo} from '../loggers/logger.js';

export const renderHome = (req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    res.render('home', {logueado: true, nombre: req.user.email});
}