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
];

const menu = [
  {
    id: 1,
    menu_name: "System",
    menu_icon: "",
    menu_url: "",
    menu_parent_id: null,
    menu_description: "System for super",
    children: [
      {
        id: 1,
        menu_name: "Menu",
        menu_icon: "",
        menu_url: "/menu",
        menu_parent_id: 1,
        menu_description: "System for super",
        children: [],
      },
      {
        id: 1,
        menu_name: "Page",
        menu_icon: "",
        menu_url: "/page",
        menu_parent_id: 1,
        menu_description: "System for super",
        children: [],
      },
    ],
  },
  {
    id: 2,
    menu_name: "Nasabah",
    menu_icon: "",
    menu_url: "/nasabah/data",
    menu_parent_id: null,
    menu_description: "System for super",
    children: [],
  },
  {
    id: 3,
    menu_name: "Master Data",
    menu_icon: "",
    menu_url: "/menu",
    menu_parent_id: null,
    menu_description: "System for super",
    children: [
      {
        id: 1,
        menu_name: "System",
        menu_icon: "",
        menu_url: "/menu",
        menu_parent_id: 3,
        menu_description: "System for super",
        children: [],
      },
    ],
  },
  {
    id: 4,
    menu_name: "Rekening",
    menu_icon: "",
    menu_url: "/menu",
    menu_parent_id: null,
    menu_description: "System for super",
    children: [
      {
        id: 1,
        menu_name: "System",
        menu_icon: "",
        menu_url: "/menu",
        menu_parent_id: 4,
        menu_description: "System for super",
        children: [],
      },
    ],
  },
];

export { headerdatanasabah, menu };
