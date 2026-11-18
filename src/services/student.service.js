
import * as data from '../data/student.data.js';
import { AppError } from '../utils/AppError.js';

export async function daftarStudent({ major, halaman = 1, ukuran = 10 }) {
    const semua = await data.semua();

    const hasil = major
        ? semua.filter(s => s.major === major)
        : semua;

    const halamanKe = Number(halaman);
    const jumlahData = Number(ukuran);

    if (!Number.isInteger(halamanKe) || halamanKe < 1 ||
        !Number.isInteger(jumlahData) || jumlahData < 1) {
        throw new AppError(400, 'Halaman dan ukuran harus bilangan bulat positif', 'PAGINATION_INVALID');
    }

    const awal = (halamanKe - 1) * jumlahData;

    return {
        data: hasil.slice(awal, awal + jumlahData),
        meta: {
            total: hasil.length,
            halaman: halamanKe,
            ukuran: jumlahData,
            totalHalaman: Math.ceil(hasil.length / jumlahData)
        }
    };
}

function ambilId(id) {
  const angka = Number(id);
  if (!Number.isInteger(angka)) {
    throw new AppError(400, 'id harus berupa bilangan bulat', 'ID_TIDAK_VALID');
  }
  return angka;
}

export async function detailStudent(id) {
    const student = await data.cariById(ambilId(id));
    if (!student) {
        throw new AppError(404,'Student tidak ditemukan','NOT_FOUND');
    }
    return student;
}

export async function buatStudent(input) {
    if (await data.cariByNim(input.nim)) {
        throw new AppError(409,`NIM ${input.nim} sudah terdaftar`,'NIM_DUPLIKAT');
    }
    return data.simpan(input);
}

export async function ubahStudent(id, input) {
    const lama = await detailStudent(id);
    const bentrok = await data.cariByNim(input.nim);

    if (bentrok && bentrok.id !== lama.id) {
        throw new AppError(409,`NIM ${input.nim} sudah dipakai mahasiswa lain`,'NIM_DUPLIKAT');
    }
    return data.ubah(lama.id, input);
}

export async function hapusStudent(id){
    const student = await detailStudent(id);
    return data.hapus(student.id);
}


export async function detailStudentDenganScore(id) {
    const angka = ambilId(id);
    const student = await data.cariByScore(angka);
    if (!student) {
        throw new AppError(404, 'Student tidak ditemukan', 'NOT_FOUND');
    }
    return student;
}


