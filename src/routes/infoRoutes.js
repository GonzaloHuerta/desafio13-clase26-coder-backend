import {Router} from 'express';
import os from 'os';

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
  router.get('/', (req, res)=>{
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
