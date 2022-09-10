import {logInfo} from '../loggers/logger.js';

export const renderLogin = (req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    if(req.user){
        res.redirect('/')
    }else{
        res.render('login');
    }
}