import express from 'express';
import { convertDoc } from '../controllers/convertController.js';

const router = express.Router();
router.post('/', convertDoc);

export default router;
