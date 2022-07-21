import {Router} from 'express';

const router = Router();
  router.get('/', (req, res)=>{
      res.send({"Hola": "Hola info!"})
  })

export default router;
