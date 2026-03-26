import express from 'express';
import multer from 'multer';
import { convertUrl, uploadDoc } from '../controllers/convertController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/convert-url', convertUrl);
router.post('/upload', upload.single('file'), uploadDoc);

export default router;