<template>
  <v-dialog
    v-model="show"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="orange" dark>
          <v-btn dark icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Cetak Mutasi')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit">
              {{$t('Save')}}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <vue-pdf-app
                style="height: 90vh;"
                :pdf="body"
                :config="config"
                :file-name="name"
                theme="light"
            >
            </vue-pdf-app>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>

import VuePdfApp from "vue-pdf-app"
import "vue-pdf-app/dist/icons/main.css";
import componentMixins from "@/mixin/component.mixin"
export default {
  mixins:[componentMixins],
  components: {
    VuePdfApp
  },
  data: () => {
    return {
      config:{
        errorWrapper:true,
        toolbar: {
          toolbarViewerLeft: {
            findbar: false,
            previous: true,
            next: true,
            pageNumber: true
          },
          toolbarViewerRight: {
            presentationMode: true,
            openFile: false,
            print: false,
            download: true,
            viewBookmark: false
          },
          toolbarViewerMiddle: {
            zoomOut: false,
            zoomIn: false,
            scaleSelectContainer: false
          }
        },
        sidebar: {
          viewThumbnail: true,
          viewOutline: true,
          viewAttachments: true
        },
        secondaryToolbar: {
          secondaryPresentationMode: true,
          secondaryOpenFile: true,
          secondaryPrint: true,
          secondaryDownload: true,
          secondaryViewBookmark: true,
          firstPage: true,
          lastPage: true,
          pageRotateCw: true,
          pageRotateCcw: true,
          cursorSelectTool: true,
          cursorHandTool: true,
          scrollVertical: true,
          scrollHorizontal: true,
          scrollWrapped: true,
          spreadNone: true,
          spreadOdd: true,
          spreadEven: true,
          documentProperties: true
        },
      }
    };
  },

};


</script>
