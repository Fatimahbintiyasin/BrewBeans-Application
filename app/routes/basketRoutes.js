// routes/basketRoutes.js
import express from 'express';
const router = express.Router();
import basketController from '../controllers/basketController.js';

// console.log('at router: basket');

router.get('/basketslist', basketController.basketsListPage);
router.get('/basketview/:id', basketController.basketViewPage);
router.get('/basketadd', basketController.basketAddPage);
router.get('/basketupdate/:id', basketController.basketUpdatePage);

router.post('/basketadd/:id', basketController.addBasket);
router.post('/basketupdate/:id', basketController.updateBasket);
router.post('/basketdelete/:id', basketController.deleteBasket);


export default router;
