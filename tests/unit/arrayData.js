export const arrayData=()=>{
   return [
       {
           "2019": 36220214,
           "2020": 31841092,
           "NO": "I",
           "POS": "PENDAPATAN OPERASIONAL",
           "TYPE": "KREDET",
           "__EMPTY": 1
       },
       {
           "2019": 31403678,
           "2020": 27580596,
           "SUB": 1,
           "POS": "Pendapatan dari Penyaluran Dana",
           "TYPE": "KREDET",
           "__EMPTY": 2
       },
       {
           "2019": 30238140,
           "2020": 26516624,
           "POS": " Pendapatan dari pihak ketiga bukan bank",
           "TYPE": "KREDET",
           "__EMPTY": 3
       },
       {
           "2019": 1165538,
           "2020": 1063972,
           "POS": " Pendapatan dari bank lain",
           "TYPE": "KREDET",
           "__EMPTY": 4
       },
       {
           "2019": 4816536,
           "2020": 4260496,
           "SUB": 2,
           "POS": "Pendapatan operasional lainnya",
           "TYPE": "KREDET",
           "__EMPTY": 5
       },
       {
           "POS": "-",
           "__EMPTY": 6
       },
       {
           "2019": 10647272,
           "2020": 10144001,
           "NO": "II",
           "POS": "HAK PIHAK KETIGA BAGI HASIL",
           "TYPE": "KREDET",
           "__EMPTY": 7
       },
       {
           "2019": 2018610,
           "2020": 1309141,
           "SUB": 1,
           "POS": "Pihak Ketiga Bukan Bank",
           "TYPE": "KREDET",
           "__EMPTY": 8
       },
       {
           "2019": 20446,
           "2020": 18295,
           "POS": "Hak tabungan mudharabah",
           "TYPE": "KREDET",
           "__EMPTY": 9
       },
       {
           "2019": 1998164,
           "2020": 1290846,
           "POS": "Hak deposito mudharabah",
           "TYPE": "KREDET",
           "__EMPTY": 10
       },
       {
           "2019": 8628662,
           "2020": 8834860,
           "SUB": 2,
           "POS": "Hak bank lainnya",
           "TYPE": "KREDET",
           "__EMPTY": 11
       },
       {
           "__EMPTY": 12
       },
       {
           "2019": 25572942,
           "2020": 21697091,
           "NO": "III",
           "POS": "PENDAPATAN BANK SEBAGAI PENGELOLA (MUDHARIB)",
           "TYPE": "KREDET",
           "__EMPTY": 13
       },
       {
           "POS": "-",
           "__EMPTY": 14
       },
       {
           "2019": 10403552,
           "2020": 7372584,
           "NO": "IV",
           "POS": "BEBAN OPERASIONAL",
           "TYPE": "KREDET",
           "__EMPTY": 15
       },
       {
           "2019": 911442,
           "2020": 775747,
           "SUB": 1,
           "POS": "Beban wadiah",
           "TYPE": "KREDET",
           "__EMPTY": 16
       },
       {
           "2019": 3967778,
           "2020": 2683767,
           "SUB": 2,
           "POS": "Beban administrasi dan umum",
           "TYPE": "KREDET",
           "__EMPTY": 17
       },
       {
           "2019": 5477036,
           "2020": 3877460,
           "SUB": 3,
           "POS": "Beban personalia",
           "TYPE": "KREDET",
           "__EMPTY": 18
       },
       {
           "2019": 47296,
           "2020": 35610,
           "SUB": 4,
           "POS": "Beban penghapusan penyisihan aktiva produktif",
           "TYPE": "KREDET",
           "__EMPTY": 19
       },
       {
           "__EMPTY": 20
       },
       {
           "2019": 15169390,
           "2020": 14324507,
           "NO": "V",
           "POS": "LABA RUGI OPERASIONAL",
           "TYPE": "KREDET",
           "__EMPTY": 21
       },
       {
           "POS": "+",
           "__EMPTY": 22
       },
       {
           "2019": 497727,
           "2020": 381742,
           "NO": "VI",
           "POS": "PENDAPATAN NON OPERASIONAL",
           "TYPE": "KREDET",
           "__EMPTY": 23
       },
       {
           "POS": "-",
           "__EMPTY": 24
       },
       {
           "2019": 42596,
           "2020": 37393,
           "NO": "VII",
           "POS": "BEBAN NON OPERASIONAL",
           "TYPE": "KREDET",
           "__EMPTY": 25
       },
       {
           "__EMPTY": 26
       },
       {
           "2019": 15624521,
           "2020": 14668856,
           "NO": "VIII",
           "POS": "LABA RUGI SEBELUM PAJAK",
           "TYPE": "KREDET",
           "__EMPTY": 27
       },
       {
           "POS": "-",
           "__EMPTY": 28
       },
       {
           "2019": 956785,
           "2020": 767893,
           "NO": "IX",
           "POS": "ZAKAT",
           "TYPE": "KREDET",
           "__EMPTY": 29
       },
       {
           "POS": "-",
           "__EMPTY": 30
       },
       {
           "2019": 2601500,
           "2020": 2587460,
           "NO": "X",
           "POS": "TAKSIRAN PAJAK PENGHASILAN",
           "TYPE": "KREDET",
           "__EMPTY": 31
       },
       {
           "__EMPTY": 32
       },
       {
           "2019": 12066236,
           "2020": 11313503,
           "NO": "XI",
           "POS": "LABA (RUGI) BERSIH TAHUN BERJALAN",
           "TYPE": "KREDET",
           "__EMPTY": 33
       }
   ]
}

export const expectResult=()=>{
  return  [
        {
            "nama_transaksi": "PENDAPATAN OPERASIONAL",
            "nominal": 36220214,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Pendapatan dari Penyaluran Dana",
                    "nominal": 31403678
                },
                {
                    "nama_transaksi": " Pendapatan dari pihak ketiga bukan bank",
                    "nominal": 30238140
                },
                {
                    "nama_transaksi": " Pendapatan dari bank lain",
                    "nominal": 1165538
                },
                {
                    "nama_transaksi": "Pendapatan operasional lainnya",
                    "nominal": 4816536
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "PENDAPATAN OPERASIONAL",
            "nominal": 31841092,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Pendapatan dari Penyaluran Dana",
                    "nominal": 27580596
                },
                {
                    "nama_transaksi": " Pendapatan dari pihak ketiga bukan bank",
                    "nominal": 26516624
                },
                {
                    "nama_transaksi": " Pendapatan dari bank lain",
                    "nominal": 1063972
                },
                {
                    "nama_transaksi": "Pendapatan operasional lainnya",
                    "nominal": 4260496
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "HAK PIHAK KETIGA BAGI HASIL",
            "nominal": 10647272,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Pihak Ketiga Bukan Bank",
                    "nominal": 2018610
                },
                {
                    "nama_transaksi": "Hak tabungan mudharabah",
                    "nominal": 20446
                },
                {
                    "nama_transaksi": "Hak deposito mudharabah",
                    "nominal": 1998164
                },
                {
                    "nama_transaksi": "Hak bank lainnya",
                    "nominal": 8628662
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "HAK PIHAK KETIGA BAGI HASIL",
            "nominal": 10144001,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Pihak Ketiga Bukan Bank",
                    "nominal": 1309141
                },
                {
                    "nama_transaksi": "Hak tabungan mudharabah",
                    "nominal": 18295
                },
                {
                    "nama_transaksi": "Hak deposito mudharabah",
                    "nominal": 1290846
                },
                {
                    "nama_transaksi": "Hak bank lainnya",
                    "nominal": 8834860
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "PENDAPATAN BANK SEBAGAI PENGELOLA (MUDHARIB)",
            "nominal": 25572942,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "PENDAPATAN BANK SEBAGAI PENGELOLA (MUDHARIB)",
            "nominal": 21697091,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "BEBAN OPERASIONAL",
            "nominal": 10403552,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Beban wadiah",
                    "nominal": 911442
                },
                {
                    "nama_transaksi": "Beban administrasi dan umum",
                    "nominal": 3967778
                },
                {
                    "nama_transaksi": "Beban personalia",
                    "nominal": 5477036
                },
                {
                    "nama_transaksi": "Beban penghapusan penyisihan aktiva produktif",
                    "nominal": 47296
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "BEBAN OPERASIONAL",
            "nominal": 7372584,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [
                {
                    "nama_transaksi": "Beban wadiah",
                    "nominal": 775747
                },
                {
                    "nama_transaksi": "Beban administrasi dan umum",
                    "nominal": 2683767
                },
                {
                    "nama_transaksi": "Beban personalia",
                    "nominal": 3877460
                },
                {
                    "nama_transaksi": "Beban penghapusan penyisihan aktiva produktif",
                    "nominal": 35610
                }
            ],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "LABA RUGI OPERASIONAL",
            "nominal": 15169390,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "LABA RUGI OPERASIONAL",
            "nominal": 14324507,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "PENDAPATAN NON OPERASIONAL",
            "nominal": 497727,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "PENDAPATAN NON OPERASIONAL",
            "nominal": 381742,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "BEBAN NON OPERASIONAL",
            "nominal": 42596,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "BEBAN NON OPERASIONAL",
            "nominal": 37393,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "LABA RUGI SEBELUM PAJAK",
            "nominal": 15624521,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "LABA RUGI SEBELUM PAJAK",
            "nominal": 14668856,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "ZAKAT",
            "nominal": 956785,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "ZAKAT",
            "nominal": 767893,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "TAKSIRAN PAJAK PENGHASILAN",
            "nominal": 2601500,
            "waktu_masuk": "2019",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        },
        {
            "nama_transaksi": "TAKSIRAN PAJAK PENGHASILAN",
            "nominal": 2587460,
            "waktu_masuk": "2020",
            "type_waktu_masuk": "tahun",
            "detail_transaksi": [],
            "type": "KREDET"
        }
    ]
}


export const arrayNeraca=()=>{
    return [
        {
            "2019": 239701289,
            "2020": 204948977,
            "NO": 1,
            "POS": "AKTIVA"
        },
        {
            "2019": 43367293,
            "2020": 49947589,
            "SUB": 1,
            "POS": "AKTIVA LANCAR"
        },
        {
            "2019": 23607594,
            "2020": 21555862,
            "KAT": 1,
            "POS": "Kas"
        },
        {
            "2019": 14624395,
            "2020": 25179532,
            "KAT": 2,
            "POS": "Penempatan Pada Bank Lain"
        },
        {
            "2019": 5135304,
            "2020": 3212195,
            "KAT": 3,
            "POS": "Persediaan"
        },
        {
            "2019": 182519962,
            "2020": 143939689,
            "SUB": 2,
            "POS": "AKTIVA PRODUKTIF"
        },
        {
            "2019": 77870189,
            "2020": 63165836,
            "KAT": 1,
            "POS": "Piutang Murabahah"
        },
        {
            "2019": 46722113,
            "2020": 37899502,
            "KAT": 2,
            "POS": "Piutang Salam"
        },
        {
            "2019": 31148075,
            "2020": 25266334,
            "KAT": 3,
            "POS": "Piutang Istishna"
        },
        {
            "2019": 1689020,
            "2020": 978295,
            "KAT": 4,
            "POS": "Pembiayaan Mudharabah"
        },
        {
            "2019": 1126013,
            "2020": 652197,
            "KAT": 5,
            "POS": "Pembiayaan Musyarakah"
        },
        {
            "2019": 2567652,
            "2020": 1606098,
            "KAT": 6,
            "POS": "Ijarah"
        },
        {
            "2019": 17973565,
            "2020": 11242683,
            "KAT": 7,
            "POS": "Qardh"
        },
        {
            "2019": 2383750,
            "2020": 2363919,
            "KAT": 8,
            "POS": "Penyisihan Pengahapusan Aktiva Produktif"
        },
        {
            "2019": 1039585,
            "2020": 764825,
            "KAT": 9,
            "POS": "Aktiva Istishna"
        },
        {
            "2019": 9655692,
            "2020": 8002397,
            "SUB": 3,
            "POS": "AKTIVA TETAP"
        },
        {
            "2019": 6214305,
            "2020": 5126989,
            "KAT": 1,
            "POS": "Aktiva Tetap dan Inventaris"
        },
        {
            "2019": 3441387,
            "2020": 2875408,
            "KAT": 2,
            "POS": "Akumulasi penghapusan Aktiva Tetap"
        },
        {
            "2019": 4158342,
            "2020": 3059302,
            "SUB": 4,
            "POS": "AKTIVA LAINYA"
        },
        {
            "2019": 227635053,
            "2020": 193635474,
            "NO": 2,
            "POS": "PASIVA"
        },
        {
            "2019": 113851651,
            "2020": 96007715,
            "SUB": 1,
            "POS": "KEWAJIBAN"
        },
        {
            "2019": 27231368,
            "2020": 19443650,
            "KAT": 1,
            "POS": "Kewajiban Jangka Pendek"
        },
        {
            "2019": 644998,
            "2020": 99508,
            "KAT": 2,
            "POS": "Kewajiban segera"
        },
        {
            "2019": 26586370,
            "2020": 19344142,
            "KAT": 3,
            "POS": "Tabungan wadiah"
        },
        {
            "2019": 86620283,
            "2020": 76564065,
            "KAT": 4,
            "POS": "Kewajiban Jangka Panjang"
        },
        {
            "2019": 86620283,
            "2020": 76564065,
            "KAT": 5,
            "POS": "Kewajiban Pada Bank Muamalat"
        },
        {
            "2019": 35988114,
            "2020": 37494254,
            "SUB": 2,
            "POS": "INVESTASI TIDAK TERIKAT"
        },
        {
            "2019": 264960,
            "2020": 389836,
            "KAT": 1,
            "POS": "Tabungan Mudharabah"
        },
        {
            "2019": 35723154,
            "2020": 37104418,
            "KAT": 2,
            "POS": "Deposito Mudharabah"
        },
        {
            "2019": 77795288,
            "2020": 60133505,
            "SUB": 3,
            "POS": "MODAL"
        },
        {
            "2019": 60005000,
            "2020": 40005000,
            "KAT": 1,
            "POS": "Modal Disetor"
        },
        {
            "2019": 8000000,
            "2020": 10000000,
            "KAT": 2,
            "POS": "Tambahan Modal Disetor"
        },
        {
            "2019": 9790288,
            "2020": 10128505,
            "KAT": 3,
            "POS": "Cadangan"
        },
        {
            "2019": 0,
            "2020": 0,
            "KAT": 4,
            "POS": "Saldo Laba Rugi"
        }
    ]
}

export const expectResultNeraca=()=>{
    return [
        {
            "index": 0,
            "first": {
                "nama": "AKTIVA",
                "waktu_masuk": "2019",
                "saldo": 239701289,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            },
            "second": {
                "nama": "AKTIVA",
                "waktu_masuk": "2020",
                "saldo": 204948977,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            }
        },
        {
            "index": 0,
            "first": {
                "nama": "AKTIVA",
                "waktu_masuk": "2019",
                "saldo": 239701289,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            },
            "second": {
                "nama": "AKTIVA",
                "waktu_masuk": "2020",
                "saldo": 204948977,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            }
        },
        {
            "index": 0,
            "first": {
                "nama": "AKTIVA",
                "waktu_masuk": "2019",
                "saldo": 239701289,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            },
            "second": {
                "nama": "AKTIVA",
                "waktu_masuk": "2020",
                "saldo": 204948977,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            }
        },
        {
            "index": 0,
            "first": {
                "nama": "AKTIVA",
                "waktu_masuk": "2019",
                "saldo": 239701289,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            },
            "second": {
                "nama": "AKTIVA",
                "waktu_masuk": "2020",
                "saldo": 204948977,
                "sub_neraca": [
                    {
                        "nama": "AKTIVA LANCAR",
                        "saldo": 43367293,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA PRODUKTIF",
                        "saldo": 182519962,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA TETAP",
                        "saldo": 9655692,
                        "sub_neraca": []
                    },
                    {
                        "nama": "AKTIVA LAINYA",
                        "saldo": 4158342,
                        "sub_neraca": []
                    }
                ]
            }
        }
    ]
}