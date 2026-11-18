
import { prisma } from '../lib/prisma.js';

export function semua() {
    return prisma.score.findMany();
}

export function simpan(input, tx = prisma) {
    return tx.score.create({data: input});
}


export function cariById(id, tx = prisma) {
    return tx.score.findUnique({where: { id }});
}

export function hapus(id, tx = prisma) {
    return tx.score.delete({where: { id }});
}


