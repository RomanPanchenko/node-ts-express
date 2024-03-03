import promiseRouter from 'express-promise-router';
import { getHello } from './controller';

const router = promiseRouter();
router.get('/hello', getHello);

export default router;
