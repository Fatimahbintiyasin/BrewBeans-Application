// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import webController from '../controllers/webController.js';

// console.log('at router: web');

router.get('/', webController.homePage);
router.get('/home', webController.homePage);
// router.get('/about', webController.aboutPage);
// router.get('/contact', webController.contactPage);
// router.post('/contact', webController.contactSend);
router.get('/reset', webController.resetPage);

router.post('/web/reset', webController.resetDatabase);



export default router;
