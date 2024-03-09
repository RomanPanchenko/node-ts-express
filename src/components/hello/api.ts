import promiseRouter from 'express-promise-router';
import { addUser, fetchDistinctCountries, getAllUsers, getHello, getStats } from './controller';

const router = promiseRouter();
router.get('/hello', getHello);
router.get('/all-users', getAllUsers);
router.post('/add-user', addUser);
router.get('/distinct-countries', fetchDistinctCountries);
router.get('/stats', getStats);

export default router;
