import {logInfo} from '../loggers/logger.js';

export const renderErrorLogin = (req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    logError.error(`Error en el login`);
    res.render('error-login');
}