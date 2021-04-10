<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <form class="form" id="kt_form" @submit.prevent="submit">
    <!--begin: Wizard Step 1-->
    <div
      class="pb-5"
      data-wizard-type="step-content"
      data-wizard-state="current"
    >
      <h3 class="mb-10 font-weight-bold text-dark">
        Menambahkan Rekening Deposito
      </h3>
      <div class="form-group">
        <label>Nasabah</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Zaenur Rochman"
          @click="dialoguser = !dialoguser"
        />
        <span class="form-text text-muted"
          >Masukkan Nasaba a=yang akan dibuat rekening.</span
        >
      </div>

      <div class="form-group">
        <label>Pegawai</label>
        <input
          type="text"
          v-model="pegawai_name"
          class="form-control form-control-solid form-control-lg"
          placeholder="Trian Damai"
          @click="dialognasabah = !dialognasabah"
        />
        <span class="form-text text-muted">Pegawai yang melayani.</span>
      </div>
      <div class="form-group">
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:01-04-202"
        />
        <span class="form-text text-muted">Pilih tanggal pembuatan.</span>
      </div>
      <div class="form-group">
        <label>Tanggal jatuh Tempo</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: 01-04-2021"
        />
        <span class="form-text text-muted">Pilih tanggal jatuh tempo.</span>
      </div>
      <div class="form-group">
        <label>Nilai Deposito</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan Nilai deposito user.</span>
      </div>
    </div>

    <!--end: Wizard Step 1-->

    <!--begin: Wizard Actions -->
    <div class="pt-10 d-flex justify-content-between border-top">
      <div class="mr-2">
        <button
          type="button"
          class="py-4 btn btn-light-primary font-weight-bold text-uppercase px-9"
        >
          Batal
        </button>
      </div>
      <div>
        <button
          type="submit"
          class="py-4 btn btn-success font-weight-bold text-uppercase px-9"
        >
          Simpan
        </button>
      </div>
    </div>
    <!--end: Wizard Actions -->
    <!-- <v-row justify="center"> -->
    <dialog-user
      :show="dialoguser"
      @choose="dialoguser = !dialoguser"
      @close="dialoguser = !dialoguser"
    />
    <dialog-nasabah
      :show="dialognasabah"
      @close="dialognasabah = !dialognasabah"
      @choose="dialognasabah = !dialognasabah"
    />
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { getUser } from "../../core/services/jwt.service";

export default {
  name: "FormUser",
  data: () => {
    return {
      nasabah_id: "",
      nasabah_name: "",
      pegawai_id: "",
      pegawai_name: "",
      dialoguser: false,
      dialognasabah: false,
    };
  },

  computed: {
    ...mapState({
      groups: (state) => {
        return state.system.datagroups;
      },
      roles: (state) => {
        return state.system.dataroles;
      },
    }),
    //form
  },
  created() {
    if (this.$route.params.id) {
      // this.getUserById(this.$route.params.id);
    }

    const pegawai = getUser();
    this.pegawai_name = pegawai.username;
    this.pegawai_id = pegawai.id;

    console.log(getUser());
  },
  methods: {
    submit() {
      if (this.isEdit) {
        if (this.username && this.email && this.role && this.group) {
          this.$emit("buttonsubmit", {
            id: this.id,
            username: this.username,
            email: this.email,
            role_id: this.role,
            group_id: this.group,
            //try use pass
            password: "admin123",
            active: 1,
          });
        }
      } else {
        if (
          this.username &&
          this.password &&
          this.email &&
          this.role &&
          this.group
        ) {
          this.$emit("buttonsubmit", {
            id: this.id,
            username: this.username,
            email: this.email,
            role_id: this.role,
            group_id: this.group,
            password: this.password,
            active: 1,
          });
        }
      }
    },
  },
};
</script>
