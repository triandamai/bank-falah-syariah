# bank-falah-syariah

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### DOC

Note

1. Butuh Get Data User Dengan Detail Role id dan Group id

Issue

1. Update user password required(harusnya opsional)

### contributing

`[UPDATE]`
`[NEW]`
`[MERGE]`
`[MINOR]`
`[CHORE]`
`[FIX]`
`[ISSUE]`

### project structure

```java
public
src
  assets
  core
    i8n //internasionalization
    mock //service for testing without backend
    plugins
    services
  store
    module
    utils
  view
      components
      pages
        ...

```

Menu

```javascript
const menu = [
  {
    id: 1,
    menu_name: "System",
    menu_icon: "",
    menu_url: "/system",
    menu_parent_id: null,
    privilages: ["super"],
    menu_description: "System for super",
    children: [
      {
        id: 1,
        menu_name: "Menu",
        menu_icon: "",
        menu_url: "/system/menu",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Page",
        menu_icon: "",
        menu_url: "/system/page",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "User",
        menu_icon: "",
        menu_url: "/user",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Group",
        menu_icon: "",
        menu_url: "/group",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Role",
        menu_icon: "",
        menu_url: "/role",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
  {
    id: 2,
    menu_name: "Nasabah",
    menu_icon: "",
    menu_url: "/nasabah",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [],
  },
  {
    id: 3,
    menu_name: "Master Data",
    menu_icon: "",
    menu_url: "/master",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [
      {
        id: 1,
        menu_name: "Akad",
        menu_icon: "",
        menu_url: "/master/akad",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Jenis Transaksi",
        menu_icon: "",
        menu_url: "/master/jenistransaksi",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Produk",
        menu_icon: "",
        menu_url: "/master/produk",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Jabatan",
        menu_icon: "",
        menu_url: "/master/jabatan",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Pegawai",
        menu_icon: "",
        menu_url: "/master/pegawai",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
  {
    id: 4,
    menu_name: "Rekening",
    menu_icon: "",
    menu_url: "/rekening",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [
      {
        id: 1,
        menu_name: "Deposito",
        menu_icon: "",
        menu_url: "/rekening/deposito",
        menu_parent_id: 4,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Pembiayaan",
        menu_icon: "",
        menu_url: "/rekening/pembiayaan",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Simpanan",
        menu_icon: "",
        menu_url: "/rekening/simpanan",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
];
```

Routing yang tersedia saat ini

```javascript
const route = [
  {
    name: "Dashboard",
    path: "/home",
    privilages: ["super"],
  },
  {
    name: "AkunData",
    path: "/akun/data",
    privilages: ["super"],
  },
  {
    name: "TambahAkun",
    path: "/akun/tambah",
    privilages: ["super"],
  },
  {
    name: "UbahAkun",
    path: "/akun/ubah",
    privilages: ["super"],
  },
  {
    name: "AkunNotFound",
    path: "/akun/*",
    privilages: ["super"],
  },
  {
    name: "DataNasabah",
    path: "/nasabah/data",
    privilages: ["super"],
  },
  {
    name: "TambahNasabah",
    path: "/nasabah/tambah",
    privilages: ["super"],
  },
  {
    name: "UbahNasabah",
    path: "/nasabah/ubah",
    privilages: ["super"],
  },
  {
    name: "NasabahNotFound",
    path: "/nasabah/*",
    privilages: ["super"],
  },
  {
    name: "PageSystem",
    path: "/system/page",
    privilages: ["super"],
  },
  {
    name: "MenuSystem",
    path: "/system/menu",
    privilages: ["super"],
  },
  {
    name: "SystemUser",
    path: "system/user",
    privilages: ["super"],
  },
  {
    name: "GroupSystem",
    path: "/system/group",
    privilages: ["super"],
  },
  {
    name: "RoleSystem",
    path: "/system/role",
    privilages: ["super"],
  },
  {
    name: "SystemNotfound",
    path: "/system/*",
    privilages: ["super"],
  },
  {
    name: "AddUser",
    path: "/system/adduser",
    privilages: ["super"],
  },
  {
    name: "MasterData",
    path: "/master",
    privilages: ["super"],
  },
  {
    name: "MasterAkad",
    path: "/master/akad",
    privilages: ["super"],
  },
  {
    name: "JenisTransaksi",
    path: "/master/jenistransaksi",
    privilages: ["super"],
  },
  {
    name: "Produk",
    path: "/master/produk",
    privilages: ["super"],
  },
  {
    name: "Jabatan",
    path: "/master/jabatan",
    privilages: ["super"],
  },
  {
    name: "Pegawai",
    path: "/master/pegawai",
    privilages: ["super"],
  },
  {
    name: "DashboarMasternotfound",
    path: "/master/*",
    privilages: ["super"],
  },
  {
    name: "Rekening",
    path: "/rekening",
    privilages: ["super"],
  },
  {
    name: "RekeningDeposito",
    path: "/rekening/deposito",
    privilages: ["super"],
  },
  {
    name: "RekeningPembiayaan",
    path: "/rekening/pembiayaan",
    privilages: ["super"],
  },
  {
    name: "RekeningSimpanan",
    path: "/rekening/simmpanan",
    privilages: ["super"],
  },
  {
    name: "RekeningNotFound",
    path: "/rekening/*",
    privilages: ["super"],
  },
  {
    name: "Tabungan",
    path: "/tabungan",
    privilages: ["super"],
  },
  {
    name: "DataTabungan",
    path: "/tabungan/data",
    privilages: ["super"],
  },
  {
    name: "Auth",
    path: "/auth",
    privilages: ["super"],
  },
  {
    name: "Login",
    path: "/auth/logn",
    privilages: ["super"],
  },
  {
    name: "AuthNotFound",
    path: "/auth/*",
    privilages: ["super"],
  },
  {
    name: "404",
    path: "*",
    privilages: ["super"],
  },
];
```
