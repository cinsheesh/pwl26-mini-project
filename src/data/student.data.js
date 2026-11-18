import { prisma } from '../lib/prisma.js';

export function semua() {
  return prisma.student.findMany();
}

export function cariById(id) {
  return prisma.student.findUnique({ where: { id } });
}

export function cariByNim(nim) {
  return prisma.student.findUnique({ where: { nim } });
}

export function simpan(input) {
  return prisma.student.create({ data: input });
}

export function ubah(id, input){
    return prisma.student.update({where: {id}, data: input});
}

export function hapus(id){
    return prisma.student.delete({where: {id}});
}

export function cariByScore(id) {
    return prisma.student.findUnique({where: { id }, include: {scores: true}});
}


export function tambahScoreCount(id, tx = prisma) {
    return tx.student.update({where: { id },data: {scoreCount: { increment: 1 }}
});
}


export function decScoreCount(id, tx = prisma) {
    return tx.student.update({
        where: { id },
        data: {
            scoreCount: { decrement: 1 }
        }
    });
}

