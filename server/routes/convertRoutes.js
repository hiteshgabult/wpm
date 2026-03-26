import express from 'express';
import multer from 'multer';
import {
  convertUrl,
  uploadDoc,
  convertPaste,
  getHistory
} from '../controllers/convertController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convert-url', convertUrl);
router.post('/upload', upload.single('file'), uploadDoc);
router.post('/paste', convertPaste);
router.get('/history', getHistory);

export default router;