<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>{{$t('Import')}}</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  @change="onFileChanged"
                  show-size
                  :disabled="loading"
                  label="File Siswa"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t('Pick File Excel') }}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text>
            <a href="https://bfsservice.bakaranproject.com/upload/format_import_siswa.xlsx">
              {{$t('Download Format')}}
            </a>

          </v-btn>
          <v-btn color="grey darken-1" text @click="close(dialog.value)">
            {{$t('Close')}}
          </v-btn>

          <v-btn
            :disabled="loading"
            @click="onSubmit"
            color="blue darken-1"
            text
          >
            {{$t('Save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
9
import componentMixin from "@/mixin/component.mixin"
import ApiService from "@/services/api.service";
export default {
 mixins:[componentMixin],
  data: () => {
    return {
      datasiswa: [],
      index:0
    };
  },
  methods: {
    onFileChanged(file) {
      this.files = file;


      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase()))
        return alert("format salah");

      const fileReader = new FileReader();
      fileReader.onloadstart = () => {
        this.loading = true;
      };
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

         // console.log(sheet)
          sheet.map((nasabah) => {
            //asosiate ke objek nasabah

            if (nasabah["nama"] && nasabah["no hp"]) {

              const hp = nasabah["no hp"];
              const nama = nasabah["nama"];
              const data = {
                nama: nama.replace(/\s/g,"%20"),
                hp: hp.replace("0","62").replace(/-/g,""),
              }
              console.log(data)
              this.datasiswa.push(data);
            }
          });
          // eslint-disable-next-line no-empty
        } catch (error) {

          console.log(error)
        }
      };
      fileReader.onprogress = () => {
        this.loading = false;
      };
      fileReader.readAsBinaryString(file);
    },
    onSubmit() {
      if(this.index >= this.datasiswa.length){
        console.log("Selesai")
      }else {
        const data = {
          nohp:this.datasiswa[this.index].hp,
          link:`https://irbayafanuruh.trian.app/invitation/${this.datasiswa[this.index].nama}`,
          pesan:`Assalamualaikum Warahmatullahi Wabarakatuh

Dalam keterbatasan di kondisi pandemi saat ini, kami memohon maaf tidak dapat mengundang secara langsung Bapak/Ibu/Saudara/i ke acara pernikahan kami.

Tanpa mengurangi rasa hormat, kami meminta kehadiran Bapak/Ibu/Saudara/i Secara Virtual untuk  memberikan doa restu kepada kami.

Dengan memohon Rahmat dan Ridho Allah  SWT, perkenankan kami:

                       Dewi Irbaya MH
(Putri dari Bapak Suminto MH dan Ibu Tarmini)
                                  dan
                    Fanuruh Muhamad
(Putra dari Bapak Muhamad Maulud dan Ibu Endang Murtiasih)

InsyaAllah akan melaksanakan pernikahan yang diselenggarakan pada;
Akad Nikah  : Minggu, 8 Agustus 2021
Pukul            : 08.00 WIB
Tempat         : Kediaman mempelai wanita. Perumahan Grand Tanjung Elok. Jl Pinus 1 Nomor 1, Purwokerto Selatan, Banyumas.
Link :

Kami yang berbahagia
Kel Bp Suminto MH & Ibu Tarmini
Kel Bp Muh Maulud & Ibu Endang M
Dewi & Opan

Wassalamu'alaikum warahmatullahi wabarakatuh


`
        }
        ApiService.postPercobaan(data).then(({status,data})=>{
          console.log(status,data)
          this.index = this.index+1;
          setTimeout(()=>{
            this.onSubmit()
          },3000)
        }).catch(e=>{
          console.log(e)
          this.index = this.index+1;
          setTimeout(()=>{
            this.onSubmit()
          },3000)
        })
      }
    },
  },
};
</script>
