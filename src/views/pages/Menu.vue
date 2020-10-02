<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <strong>Menu</strong>
        </v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <v-card class="mx-auto">
            <v-sheet class="pa-2 primary">
              <v-text-field
                v-model="search"
                label="Cari Menu"
                dark
                flat
                solo-inverted
                clearable
                small
                clear-icon="mdi-close-circle-outline"
              ></v-text-field>
            </v-sheet>
            <v-card-text>
              <v-treeview
                :items="items"
                :search="search"
                :filter="filter"
                :open.sync="open"
              >
                <template v-slot:prepend="{ item }">
                  <v-icon
                    v-if="item.children"
                    v-text="
                      `mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`
                    "
                  >
                  </v-icon>
                </template>
                <template v-slot:append="{ item }">
                  {{ item.children ? "" : item.url }}
                  <v-chip
                    v-if="!item.children"
                    class="ma-2"
                    :color="item.status == 'aktif' ? 'green' : 'red'"
                    label
                    outlined
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
              </v-treeview>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Menu",

  data: function() {
    return {
      search: "",
      loading: true,
      items: [
        {
          id: 1,
          name: "Data Menu",
          url: "/url",
          children: [
            {
              id: 2,
              name: "User",
              url: "/user",
              children: [
                {
                  id: 201,
                  name: "Data Pegawai",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 202,
                  name: "Data Jabatan",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 203,
                  name: "Data User",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 204,
                  name: "Role Akses",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 205,
                  name: "Menu",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 3,
              name: "Data Master",
              url: "/url",
              children: [
                {
                  id: 301,
                  name: "Coa",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 302,
                  name: "Produk",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 303,
                  name: "Kolektibilitas",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 304,
                  name: "Pengaturan",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 305,
                  name: "Program",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 306,
                  name: "Jaminan",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 307,
                  name: "Distribusi Basil COA",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 308,
                  name: "Jenis Transaksi",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 4,
              name: "Data Anggota",
              url: "/url",
              children: [
                {
                  id: 401,
                  name: "Rembug",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 402,
                  name: "Kelompok",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 403,
                  name: "Anggota",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 404,
                  name: "Rekening",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 405,
                  name: "Aktivasi Nasabah",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 5,
              name: "Transaksi Teller",
              url: "/url",
              children: [
                {
                  id: 501,
                  name: "Simpanna",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 502,
                  name: "Pembiayaan",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 503,
                  name: "Simpanan Berjangka",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 504,
                  name: "Transaksi Kelompok",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 6,
              name: "Transaksi Umum",
              url: "/url",
              children: [
                {
                  id: 601,
                  name: "Kas Keluar/Masuk",
                  url: "/datapegawai",
                  status: "tidak aktif"
                },
                {
                  id: 602,
                  name: "Transaksi Lainnya",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 603,
                  name: "Selisi Kas",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 7,
              name: "Accounting",
              url: "/url",
              children: [
                {
                  id: 701,
                  name: "Masukkan Jurnal",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 702,
                  name: "Jurnal Umum",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 8,
              name: "Otomasi",
              url: "/url",
              children: [
                {
                  id: 801,
                  name: "Distribusi Profit",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            },
            {
              id: 9,
              name: "Laporan",
              url: "/url",
              children: [
                {
                  id: 901,
                  name: "Keuangan",
                  url: "/datapegawai",
                  status: "aktif"
                },
                {
                  id: 902,
                  name: "Npf",
                  url: "/datapegawai",
                  status: "aktif"
                }
              ]
            }
          ]
        }
      ],
      open: [1, 2],
      search: null
    };
  },
  computed: {
    filter() {
      return (item, search, textKey) => item[textKey].indexOf(search) > -1;
    }
  },
  methods: {}
};
</script>

<style></style>
