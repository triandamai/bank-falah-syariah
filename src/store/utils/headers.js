/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
export const headerdatanasabah = [
  {
    text: "No",
    align: "left",
    sortable: false,
    value: "id"
  },
  { text: "Kode Nasabah", value: "kode_nasabah" },
  { text: "Nama Nasabah", value: "nama_lengkap" },
  { text: "Jenis Kelamin", value: "jenis_kelamin" },
  { text: "TTl", value: "ttl" },
  { text: "Alamat", value: "alamat" },
  { text: "Telp.", value: "no_hp" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "action" }
];

export const headerdatauser = [
  {
    text: "No",
    align: "left",
    sortable: false,
    value: "id"
  },
  {
    text: "Username",
    align: "left",
    sortable: true,
    value: "username"
  },
  {
    text: "Status",
    align: "left",
    sortable: true,
    value: "active"
  },
  {
    text: "Aktivitas Terakhir",
    align: "left",
    sortable: false,
    value: "last_login"
  },
  { text: "Aksi", value: "action" }
];
export const headerdatarole = [
  { text: "No", value: "id" },
  { text: "Nama Role", sortable: true, value: "name" },
  { text: "Deskripsi", value: "description" },
  { text: "Aktivitas", value: "updated_at" },
  { text: "Aksi", value: "action" }
];
export const headerdatagroup = [
  { text: "No", value: "id" },
  { text: "Nama Role", sortable: true, value: "name" },
  { text: "Deskripsi", sortable: true, value: "description" },
  { text: "Aktivitas", value: "updated_at" },
  { text: "Aksi", value: "action" }
];
export const headerdataakad = [
  { text: "No", value: "id" },
  { text: "Nama", value: "nama_akad" },
  { text: "Kode", value: "kode_akad" },
  { text: "Status", value: "active" }
];
export const headerdatajenistransaksi = [
  { text: "No", value: "id" },
  {
    text: "Kode Transaksi",
    value: "kode_transaksi"
  },
  {
    text: "Nama Transaksi",
    value: "nama_transaksi"
  },
  {
    text: "Dibuat pada",
    value: "created_at"
  }
];
export const headerdataproduk = [
  { text: "No", value: "id" },
  { text: "Tipe", value: "tipe_produk" },
  { text: "Kode", value: "kode_produk" },
  { text: "Nama", value: "nama_produk" },
  { text: "Akad", value: "akad_id" },
  { text: "Aksi", value: "action" }
];
export const headerdatajabatan = [{ text: "No", value: "id" }];
export const headerdatapegawai = [{ text: "No", value: "id" }];
export const headerdatadeposito = [
  { text: "No", value: "id" },
  { text: "Dibuka", value: "tgl_buka" },
  { text: "Jatuh Tempo", value: "tgl_jatuh_tempo" },
  { text: "Nasabah", value: "nasabah_id" },
  { text: "Teller", value: "pegawai_id" },
  { text: "Nilai", value: "nilao_deposito" },
  { text: "Aksi", value: "action" }
];
export const headerdatapembiayaan = [
  { text: "No", value: "id" },
  { text: "Pencairan", value: "tgl_pencairan" },
  { text: "Jatuh Tempo", value: "tgl_jatuh_tempo" },
  { text: "Nasabah", value: "nasabah_id" },
  { text: "Teller", value: "pegawai_id" },
  { text: "Nila", value: "nilao_deposito" },
  { text: "Lama Angsuran", value: "id" }
];

export const headerdatasimpanan = [{ text: "No", value: "id" }];
