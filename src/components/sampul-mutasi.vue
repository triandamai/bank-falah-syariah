<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
    scrollable
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>{{$t('Form Akad')}}</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
<!--                <pdf-->
<!--                    :src="body"-->
<!--                />-->
                <div id="pageContainer">
                  <div id="viewer" class="pdfViewer"></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <small>{{$t('indicates required field')}}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close(dialog.value)"
          >
            {{ $t('Close') }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> {{ $t('Save') }} </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>

import pdf from "vue-pdf-cdn";
import pdfjslib from "pdfjs-dist/build/pdf"
import {PDFViewer} from "pdfjs-dist/web/pdf_viewer"
import "pdfjs-dist/web/pdf_viewer.css";
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

import componentMixins from "@/mixin/component.mixin"
export default {
  mixins:[componentMixins],
  components: {
    pdf
  },
  data: () => {
    return {

    };
  },
  created() {
    this.render()
  },

  computed: {

  },
  methods:{
   async render(){
      let container = document.getElementById("pageContainer");
      let pdfViewer = new PDFViewer({
        container: container
      });
      let loadingTask = pdfjslib.getDocument(this.body);
      let pdf = await loadingTask.promise;
      pdfViewer.setDocument(pdf);
    }
  }
};
</script>
