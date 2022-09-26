import {Router} from 'express';
import passport from 'passport';
import {logError, logInfo} from '../loggers/logger.js';
import { renderHome } from '../controllers/homeController.js';
import { renderLogin } from '../controllers/loginController.js';
import { renderErrorLogin } from '../controllers/errorLoginController.js';
import { renderLogout } from '../controllers/logoutController.js';
import { renderRegister } from '../controllers/registerController.js';
import { renderErrorRegister } from '../controllers/errorRegisterController.js';
import { getAllProducts, addProduct } from '../controllers/productController.js';

const router = Router();

    function isAuth(req, res, next){
        if(req.isAuthenticated()){
            next()
        }else{
            res.render('login')
        }
    }

    router.get('/', isAuth, renderHome);

    router.get('/login', renderLogin);

    router.post('/login', passport.authenticate('login', {
        failureRedirect: '/error-login',
        successRedirect: '/'
    }))

    router.get('/error-login', renderErrorLogin);

    router.get('/logout', renderLogout);

    router.get('/register', renderRegister);

    router.post('/register', passport.authenticate('register',{
        failureRedirect: '/error-register',
        successRedirect: '/login'
    }));

    router.get('/error-register', renderErrorRegister)

    //productos
    router.get('/products', getAllProducts);
    router.post('/products', addProduct);  

export default router;
