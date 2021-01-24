# bank-falah-syariah

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#DOC
Note

1. Butuh Get Data User Dengan Detail Role id dan Group id

Issue

1. Update user password required(harusnya opsional)

   Routing yang tersedia saat ini

```javascript
route = [
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
