import {Router} from 'express';
import passport from 'passport';

const router = Router();

    function isAuth(req, res, next){
        if(req.isAuthenticated()){
            next()
        }else{
            res.render('login')
        }
    }

    router.get('/', isAuth, (req, res)=>{
        console.log("req.user: ", req.user)
        res.render('home', {logueado: true, nombre: req.user.email}); 
    })

    router.get('/login', (req, res)=>{
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
        res.render('error-login');
    })

    router.get('/logout', (req, res)=>{
        const nombre = req.session.user;
        req.session.destroy(err=>{
            res.render('hasta-luego', {nombre: nombre})
        })
    })

    router.get('/register', (req, res)=>{
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
        res.render('error-register');
    })

export default router;
