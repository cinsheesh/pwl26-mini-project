
import * as service from '../services/student.service.js';

export async function daftar(req, res) {
    const hasil = await service.daftarStudent(req.query);
    res.json({ data: hasil.data, meta: hasil.meta });
}

export async function detail(req, res) {
    const s = await service.detailStudent(req.params.id);
    res.json({ data: s });
}

export async function buat(req, res) {
    const baru = await service.buatStudent(req.body);
    res.status(201).json({ data: baru });
}

export async function ubah(req, res) {
    const s = await service.ubahStudent(req.params.id, req.body);
    res.json({ data: s });
}

export async function hapus(req, res){
    await service.hapusStudent(req.params.id);
    res.status(204).end();
}

export async function detailDenganScore(req, res) {
    const s = await service.detailStudentDenganScore(req.params.id);
    res.json({ data: s });
}