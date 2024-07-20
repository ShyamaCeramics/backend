import express from 'express';
import { getOrderDetails, getOrderProductsDetails, saveOrderDetails } from '../controllers/orderController';
const router = express.Router();

router.get('/fetch', getOrderDetails);
router.post('/save', saveOrderDetails);
router.get('/:orderId', getOrderProductsDetails);

export default router;
