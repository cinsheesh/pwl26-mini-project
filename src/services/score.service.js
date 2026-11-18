
import * as data from '../data/score.data.js';
import * as studentData from '../data/student.data.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../lib/prisma.js';

export async function daftarScore() {
    return data.semua();
}

export async function buatScore(input) {
    const student = await studentData.cariById(Number(input.studentId));

    if (!student) {
        throw new AppError(404, 'Student tidak ditemukan', 'NOT_FOUND');
    }

    return prisma.$transaction(async (tx) => {
        const baru = await data.simpan(input, tx);
        await studentData.tambahScoreCount(student.id, tx);
        

        return baru;
     })
}


export async function hapusScore(id) {
    const angka = Number(id);

    if (!Number.isInteger(angka) || angka < 1) {
        throw new AppError(400, 'ID Score tidak valid', 'ID_TIDAK_VALID');
    }

    return prisma.$transaction(async (tx) => {
        const score = await data.cariById(angka, tx);

        if (!score) {
            throw new AppError(404, 'Score tidak ditemukan', 'NOT_FOUND');
        }

        await data.hapus(angka, tx);
        await studentData.decScoreCount(score.studentId, tx);
    });
}

