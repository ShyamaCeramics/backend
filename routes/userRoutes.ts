import express from 'express';
import { getUserDetails, saveUserDetails } from '../controllers/userController';
const router = express.Router();

router.get('/fetch', getUserDetails);
router.post('/save', saveUserDetails);

export default router;
