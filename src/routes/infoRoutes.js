import {Router} from 'express';
import os from 'os';
import compression from 'compression';
import {logInfo} from '../loggers/logger.js';

const numProc = os.cpus().length;
const argumentos = process.argv;
const plataforma = process.platform;
const versionNode = process.versions.node;
const usoDeMemoria = process.memoryUsage().rss;
const pathEjecucion = process.execPath;
const processId = process.pid;
const carpetaProyecto = process.env.INIT_CWD;

console.log(usoDeMemoria.rss)

const router = Router();
  router.get('/', compression(), (req, res)=>{        //Memoria total reservada: sin gzip: 59297792 || con gzip: 59248640
    logInfo.info(`Ruta: ${req.path}info | Método ${req.method}`);
    res.render('info', 
    {
      argumentos: argumentos, 
      plataforma: plataforma, 
      versionNode: versionNode,
      usoDeMemoria: usoDeMemoria,
      pathEjecucion: pathEjecucion, 
      processId: processId, 
      carpetaProyecto: carpetaProyecto,
      numeroDeProcesadores: numProc
    }
    )
  })

export default router;
