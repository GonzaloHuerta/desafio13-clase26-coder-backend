import {Router} from 'express';

const argumentos = process.argv;
const plataforma = process.platform;
const versionNode = process.versions.node;
const pathEjecucion = process.execPath;
const processId = process.pid;
const carpetaProyecto = process.env.INIT_CWD;

const router = Router();
  router.get('/', (req, res)=>{
    res.render('info', 
    {
      argumentos: argumentos, 
      plataforma: plataforma, 
      versionNode: versionNode, 
      pathEjecucion: pathEjecucion, 
      processId: processId, 
      carpetaProyecto: carpetaProyecto
    }
    )
  })

export default router;
