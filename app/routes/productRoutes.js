// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';

// console.log('at router: products');

router.get('/productslist', productController.productsListPage);
router.get('/productview/:id', productController.productViewPage);
router.get('/productadd', productController.productAddPage);
router.get('/productupdate/:id', productController.productUpdatePage);

router.post('/productadd/:id', productController.addProduct);
router.post('/productupdate/:id', productController.updateProduct);
router.post('/productdelete/:id', productController.deleteProduct);

export default router;
