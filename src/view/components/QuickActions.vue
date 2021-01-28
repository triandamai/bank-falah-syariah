<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <div class="topbar-item mr-4">
    <div id="kt_quick_actions_toggle">
      <a href="#" class="btn btn-icon btn-sm btn-clean btn-text-dark-75">
        <span class="svg-icon svg-icon-lg">
          <inline-svg
            :src="require('@/assets/images/svg/icons/Layout/Layout4.svg')"
          />
        </span>
      </a>
    </div>

    <div
      id="kt_quick_actions"
      ref="kt_quick_actions"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-10"
      >
        <h3 class="font-weight-bold m-0">
          Aksi Cepat
          <small class="text-muted font-size-sm ml-2"
            >shortcut &amp; jalan pintas</small
          >
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_actions_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->
      <!--begin::Content-->
      <div class="offcanvas-content pr-5 mr-n5">
        <div
          v-for="(item, index) in quickActions"
          :key="index"
          class="row gutter-b"
        >
          <!--begin::Item-->
          <div v-for="(sub, idx) in item" :key="idx" class="col-6">
            <a
              href="#"
              class="btn btn-block btn-light btn-hover-primary text-dark-50 text-center py-10 px-5"
            >
              <span class="svg-icon svg-icon-3x svg-icon-primary m-0">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Euro.svg-->
                <inline-svg :src="sub.menu_icon" />
                <!--end::Svg Icon-->
              </span>
              <span class="d-block font-weight-bold font-size-h6 mt-2">{{
                sub.menu_name
              }}</span>
            </a>
          </div>
          <!--end::Item-->
        </div>
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<script>
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-actions.js";
import { quickAction } from "@/store";
export default {
  name: "AksiCepat",
  data: () => {
    return {
      quickActions: quickAction,
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_actions"]);
  },
  methods: {},
  computed: {},
};
</script>
