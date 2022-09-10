import {logInfo} from '../loggers/logger.js';

export const renderLogout = (req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    const nombre = req.session.user;
    req.session.destroy(err=>{
        res.render('hasta-luego', {nombre: nombre})
    })
}