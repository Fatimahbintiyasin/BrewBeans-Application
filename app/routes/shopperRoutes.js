// routes/basketRoutes.js
import express from 'express';
const router = express.Router();
import shopperController from '../controllers/shopperController.js';

// console.log('at router: shopper');

router.get('/shopperslist', shopperController.shoppersListPage);
router.get('/shopperview/:id', shopperController.shopperView);

// router.post('/basketstatusadd', basketController.basketStatusAdd);



export default router;
