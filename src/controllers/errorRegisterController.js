import {logInfo} from '../loggers/logger.js';

export const renderErrorRegister = (req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    logError.error(`Error en el register`);
    res.render('error-register');
}