import {Router} from 'express';
import passport from 'passport';
import {logError, logInfo} from '../loggers/logger.js';

const router = Router();

    function isAuth(req, res, next){
        if(req.isAuthenticated()){
            next()
        }else{
            res.render('login')
        }
    }

    router.get('/', isAuth, (req, res)=>{
        console.log("req.user: ", req.user);
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        res.render('home', {logueado: true, nombre: req.user.email});
    })

    router.get('/login', (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        if(req.user){
            res.redirect('/')
        }else{
            res.render('login');
        }
    })

    router.post('/login', passport.authenticate('login', {
        failureRedirect: '/error-login',
        successRedirect: '/'
    }))

    router.get('/error-login', (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        logError.error(`Error en el login`);
        res.render('error-login');
    })

    router.get('/logout', (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        const nombre = req.session.user;
        req.session.destroy(err=>{
            res.render('hasta-luego', {nombre: nombre})
        })
    })

    router.get('/register', (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        if(req.user){
            res.redirect('/')
        }else{
            res.render('register');
        }
    })

    router.post('/register', passport.authenticate('register',{
        failureRedirect: '/error-register',
        successRedirect: '/login'
    }));

    router.get('/error-register', (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        logError.error(`Error en el register`);
        res.render('error-register');
    })

export default router;
