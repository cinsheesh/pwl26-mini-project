
import express from 'express';
import * as ctrl from '../controllers/score.controller.js';
import { cekApiKey } from '../middleware/cekApiKey.js';
import { validasi } from '../middleware/validasi.js';
import { skemaScore } from '../validators/score.validator.js';

const router = express.Router();

router.get('/', ctrl.daftar);
router.post('/', cekApiKey, validasi(skemaScore), ctrl.buat);
router.delete('/:id', cekApiKey, ctrl.hapus);

export default router;
