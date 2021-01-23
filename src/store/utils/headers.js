/*eslint-disable*/
const headerdatanasabah = [
  {
    text: "No",
    align: "left",
    sortable: false,
    value: "id",
  },
  { text: "Kode Nasabah", value: "kode_nasabah" },
  { text: "Nama Nasabah", value: "nama_lengkap" },
  { text: "Jenis Kelamin", value: "jenis_kelamin" },
  { text: "TTl", value: "ttl" },
  { text: "Alamat", value: "alamat" },
  { text: "Telp.", value: "no_hp" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "action" },
];

const headerdatausers = [
  {
    text: "No",
    align: "left",
    sortable: false,
    value: "id",
  },
  {
    text: "Username",
    align: "left",
    sortable: true,
    value: "username",
  },
  {
    text: "Status",
    align: "left",
    sortable: true,
    value: "active",
  },
  {
    text: "Aktivitas Terakhir",
    align: "left",
    sortable: false,
    value: "last_login",
  },
  { text: "Aksi", value: "action" },
];
const headerroles = [
  { text: "No", value: "id" },
  { text: "Nama Role", sortable: true, value: "name" },
  { text: "Deskripsi", value: "description" },
  { text: "Aktivitas", value: "updated_at" },
  { text: "Aksi", value: "action" },
];
const headergroups = [
  { text: "No", value: "id" },
  { text: "Nama Role", sortable: true, value: "name" },
  { text: "Deskripsi", value: "description" },
  { text: "Aktivitas", value: "updated_at" },
  { text: "Aksi", value: "action" },
];

export { headerdatanasabah, headerdatausers, headerroles, headergroups };
