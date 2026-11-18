import * as service from '../services/score.service.js';

export async function buat(req, res) {
    const baru = await service.buatScore(req.body);
    res.status(201).json({ data: baru });
}

export async function daftar(req, res) {
    const hasil = await service.daftarScore();
    res.json({ data: hasil });
}

export async function hapus(req, res) {
    await service.hapusScore(req.params.id);
    res.status(204).end();
}

