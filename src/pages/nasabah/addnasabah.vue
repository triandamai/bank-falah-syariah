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
import { ACTION_POST_NASABAH } from "@/store/modules/nasabah";
import ApiService from "@/services/api.service";
export default {
  data:()=>{
    return{
      overlay:false,
      body:{},
      form:true,
      pdf:null
    }
  },
  created() {
    this.onSubmit({})
  },
  methods: {
    onSubmit(data) {
    ApiService.downloadFile().then((response)=>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        this.pdf = url
        link.setAttribute('download',"tes.pdf")
        document.body.appendChild(link)
       // link.click()
      });
      // this.overlay = true
      // this.$store
      //   .dispatch(ACTION_POST_NASABAH, data)
      //   .then(() => {
      //     this.overlay = false
      //
      //   });
    },
  },
};
</script>