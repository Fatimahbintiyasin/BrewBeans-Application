// routes/basketRoutes.js
import express from 'express';
const router = express.Router();
import basketStatusController from '../controllers/basketStatusController.js';

router.get('/basketstatuslist/:id', basketStatusController.basketStatusListViewPage);
router.get('/basketstatusadd/:id', basketStatusController.basketStatusAddPage);

router.post('/basketstatusadd', basketStatusController.basketStatusAdd);

// console.log("basketStatusRouters")

export default router;
