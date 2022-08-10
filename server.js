import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import {mensajesDao as api} from './src/daos/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './src/passport/local.js';
import passport from 'passport';
import apiRoutes from './src/routes/apiRoutes.js';
import infoRoutes from './src/routes/infoRoutes.js';
import apiRandomRoutes from './src/routes/apiRandomRoutes.js';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const numProc = os.cpus().length;

//ejecutar server así: npm run dev --puerto 3030 cluster // npm run dev --puerto 3030 fork
const argumentos = minimist(process.argv)
console.log("ppp: ", argumentos)

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

if(argumentos._[3] == 'cluster'){
    if (cluster.isMaster){
        for (let i = 0; i < numProc; i++) {
            cluster.fork();
        }
    }
}else{
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
    
    app.use('/', apiRoutes);
    app.use('/info', infoRoutes);
    app.use('/api/randoms', apiRandomRoutes);
    
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
    
    const PORT = argumentos._[2] || 8081;
    httpServer.listen(PORT, ()=>{
        console.log("Corriendo en el puerto ", PORT)
    })    
}

