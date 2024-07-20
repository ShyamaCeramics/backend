import express from 'express';
import { getOrderDetails, getOrderProductsDetails, saveOrderDetails, updateOrderStatus } from '../controllers/orderController';
const router = express.Router();

router.get('/fetch', getOrderDetails);
router.post('/save', saveOrderDetails);
router.put('/status', updateOrderStatus);
router.get('/:orderId', getOrderProductsDetails);

export default router;
