import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import {mensajesDao as api} from './src/persistencia/daos/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './src/passport/local.js';
import passport from 'passport';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import {logError, logWarning, logInfo} from './src/loggers/logger.js';

//routes
import apiRoutes from './src/routes/apiRoutes.js';
import infoRoutes from './src/routes/infoRoutes.js';
import apiRandomRoutes from './src/routes/apiRandomRoutes.js';

const numProc = os.cpus().length;

//ejecutar server así: npm run dev --puerto 3030 cluster // npm run dev --puerto 3030 fork
const argumentos = minimist(process.argv)
console.log("ppp: ", argumentos)

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

if(argumentos._[3] == 'cluster'){
    if (cluster.isPrimary){
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

    app.get('/*', (req, res)=>{
        logWarning.warn(`Se intentó acceder a la ruta ${req.path} mediante el método ${req.method} y es inválida`)
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`)
        res.send(`La ruta ${req.path} no existe`)
    })
    
    const PORT = process.env.PORT || argumentos._[2] || 8081;
    httpServer.listen(PORT, ()=>{
        //logPrueba.warn('Warn');
        /* logPrueba.debug('Debug');
        logPrueba.error('Error');
        logPrueba.info("Info"); */

        console.log("Corriendo en el puerto ", PORT)
    })    
}

/* Análisis de performance */

// 1. Ejecuté el servidor en profilling con el siguiente comando: "node --prof-process server.js"
// 2. Análisis con artillery: utilicé el siguiente comando: "artillery quick --count 20 --num 50 http://localhost:8081 > resultados.txt" Los resultados se encuentran en resultados.txt
// 3. Análisis con autocannon: utilicé el siguiente comando: "autocannon -d 20 -c 100 http://localhost:8081/api/randoms". Screenshot con los resultados incluido (analisis-autocannon.png)
// 4. Diagrama de flama con 0x: Inicialicé el servidor con 0x server.js y utilicé los mismos parámetros del punto anterior para autocannon. Se creo la carpeta con gráfico de flama (22252.0x)
