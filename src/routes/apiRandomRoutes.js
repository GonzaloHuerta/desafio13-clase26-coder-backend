import {Router} from 'express';
import {obtenerNumerosRandom} from '../controllers/apiRandomController.js';

const router = Router();

router.get('/', obtenerNumerosRandom);

export default router;