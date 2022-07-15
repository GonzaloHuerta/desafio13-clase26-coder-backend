import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import {mensajesDao as api} from './src/daos/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './src/passport/local.js';
import passport from 'passport';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const app = express();

const httpServer = http.createServer(app);

const io = new ioServer(httpServer);

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secretKey',
    store: MongoStore.create({mongoUrl:`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.o7pgm.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`}),
    cookie:{maxAge: 600000}
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mensajes = await api.getAll();

function isAuth(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.render('login')
    }
}

app.get('/', isAuth, (req, res)=>{
    console.log("req.user: ", req.user)
    res.render('home', {logueado: true, nombre: req.user.email}); 
})

app.get('/login', (req, res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('login');
    }
})

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/error-login',
    successRedirect: '/'
}))

app.get('/error-login', (req, res)=>{
    res.render('error-login');
})

app.get('/logout', (req, res)=>{
    const nombre = req.session.user;
    req.session.destroy(err=>{
        res.render('hasta-luego', {nombre: nombre})
    })
})

app.get('/register', (req, res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('register');
    }
})

app.post('/register', passport.authenticate('register',{
    failureRedirect: '/error-register',
    successRedirect: '/login'
}));

app.get('/error-register', (req, res)=>{
    res.render('error-register');
})


io.on('connection', (socket)=>{
    console.log("Cliente conectado", socket.id);;
    socket.emit('mensajes', mensajes);

    socket.on('nuevo-mensaje', async(mensaje)=>{
        mensajes.push(mensaje);
        await api.create(mensaje);
        console.log(mensajes)
        io.sockets.emit('mensajes', mensajes);
    })
})

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log("Corriendo en el puerto ", PORT)
})


