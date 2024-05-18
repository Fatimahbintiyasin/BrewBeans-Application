// routes/basketRoutes.js
import express from 'express';
const router = express.Router();
import basketItemsController from '../controllers/basketItemsController.js';

// console.log('at router: basketItems');

router.get('/shop/:dt', basketItemsController.shop);
router.get('/basketitemslistview/:id', basketItemsController.basketItemsViewPage);

router.post('/add-to-basket', basketItemsController.basketAddItem);

// router.get('/basketslist', basketItemsController.basketsListPage);
// router.get('/basketview/:id', basketItemsController.basketViewPage);
// router.get('/basketadd', basketItemsController.basketAddPage);
// router.get('/basketupdate/:id', basketItemsController.basketUpdatePage);

// router.post('/basketadd/:id', basketItemsController.addBasket);
// router.post('/basketupdate/:id', basketItemsController.updateBasket);
// router.post('/basketdelete/:id', basketItemsController.deleteBasket);

export default router;
