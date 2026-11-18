
import express from 'express';
import * as ctrl from '../controllers/student.controller.js';
import { cekApiKey } from '../middleware/cekApiKey.js';
import { validasi } from '../middleware/validasi.js';
import { skemaStudent } from '../validators/student.validator.js';


const router = express.Router();

router.get('/', ctrl.daftar);
router.get('/:id', ctrl.detail);
router.get('/:id/scores', ctrl.detailDenganScore);
router.post('/', cekApiKey, validasi(skemaStudent), ctrl.buat);
router.put('/:id', cekApiKey, validasi(skemaStudent), ctrl.ubah);
router.delete('/:id', cekApiKey, ctrl.hapus);

export default router;
