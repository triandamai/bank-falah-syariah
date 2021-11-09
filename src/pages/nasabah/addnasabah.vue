<template>
  <div>
    <Breadcrumbs :title="$t('Customer')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{ $t('Form Nasabah') }}</h5>
              <span
                >{{$t('subtitle form nasabah')}}</span
              >
            </div>
            <form-nasabah :isEdit="false" @submit="onSubmit" :body="{}" />
          </div>
        </div>
      </div>
    </div>
<!--    -->
    <dialog-cetak
        :show="form"
        :body="pdf"
        :name="namaFile"
        @close="form = false"
        @submit="downloadFile"
    />
    <!-- Container-fluid Ends-->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { ACTION_POST_NASABAH } from "@/store/modules/customer";
import ApiService from "@/services/api.service";
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data:()=>{
    return{
      overlay:false,
      body:{},
      nasabah:{},
      namaFile:"",
      form:false,
      pdf:null,
      //this data just for testing
      data:[
        {
          "id": 29,
          "kode_nasabah": "KODE90",
          "nama_lengkap": "Trian",
          "nama_panggilan": "Damai",
          "jenis_kelamin": "L",
          "tempat_lahir": "",
          "tanggal_lahir": "2021-10-04",
          "alamat": "dsd",
          "alamat_provinsi_id": 5,
          "alamat_kabupaten_id": 5,
          "alamat_kecamatan_id": 6,
          "tlpkantor": "7890",
          "tlprumah": "",
          "alamat_desa_id": 6,
          "no_hp": "45678",
          "email": "tes@gmail.com",
          "agama_id": 1,
          "pendidikan_id": 7,
          "status_martial_id": 1,
          "jenis_identitas_id": 1,
          "no_identitas": "5678",
          "masa_berlaku_identitas": "",
          "kewarganegaraan": "",
          "nama_keluarga_dekat": "",
          "hubungan_keluarga_dekat": "",
          "alamat_keluarga_dekat": "",
          "tlprumah_keluarga_dekat": "",
          "tlpkantor_keluarga_dekat": "",
          "nohp_keluarga_dekat": "",
          "email_keluarga_dekat": "",
          "nama_ibu_kandung": "shajh",
          "nama_waris": "",
          "hubungan_waris": "",
          "jenis_identitas_waris_id": "",
          "no_identitas_waris": "",
          "masa_berlaku_identitas_waris": "",
          "jenis_pekerjaan_id": 4,
          "nama_perusahaan": "dasa",
          "alamat_provinsi_id_pekerjaan": "",
          "alamat_kabupaten_id_pekerjaan": "",
          "alamat_kecamatan_id_pekerjaan": "",
          "alamat_desa_id_pekerjaan": "",
          "status_pekerjaan": "",
          "penghasilan_perbulan": 60000000,
          "penghasilan_pertahun": 90000000,
          "status_nasabah_id": "",
          "reference_id": "",
          "status_simpanan_pokok": "",
          "jabatan_pekerjaan": "",
          "alamat_pekerjaan": "",
          "join_date": "",
          "out_date": "",
          "active": "1",
          "created_at": "2021-10-15T15:17:38.000000Z",
          "updated_at": "2021-10-15T15:17:38.000000Z",
          "no_rekening": "01.0101.00011"
        }
      ]
    }
  },
  created() {

  },
  methods: {
    onSubmit(data) {
     this.startLoading()
      this.$store
        .dispatch(ACTION_POST_NASABAH, data)
        .then(({success,data}) => {
          if(success){
            ApiService.downloadFile(data.no_rekening)
                .then((response)=>{
                 this.stopLoading()
                  this.nasabah = data
                     this.namaFile = `${this.nasabah.nama_lengkap}-${this.nasabah.no_rekening}.pdf`
                  const pdfCacheUrl = window.URL.createObjectURL(new Blob([response.data]));
                  this.pdf = pdfCacheUrl
                  this.form = true
            }).catch(()=>{
              this.stopLoading()
            });
          }else {
            this.stopLoading()
          }

        });
    },
    downloadFile(){
      if(this.pdf) {
        const createDownloadElement = document.createElement("a")
        createDownloadElement.href = this.pdf
        createDownloadElement.setAttribute("download", `${this.nasabah.nama_lengkap}-${this.nasabah.no_rekening}.pdf`)
        document.body.appendChild(createDownloadElement)
        createDownloadElement.click()
      }else {
        //file doesn't exist
      }
    }
  },
};
</script>