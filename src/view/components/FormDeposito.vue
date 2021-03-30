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
        Atur user yang akan ditambahkan
      </h3>
      <div class="form-group">
        <label>Nasabah</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Purwokerto selatan,Banyumas"
          @click="dialoguser = !dialoguser"
        />
        <span class="form-text text-muted">Masukkan alamat user.</span>
      </div>

      <div class="form-group">
        <label>Pegawai</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: bakaranproject@contoh.com"
          @click="dialognasabah = !dialognasabah"
        />
        <span class="form-text text-muted">Email aktif user.</span>
      </div>
      <div class="form-group">
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:john.wick@reeves.com"
        />
        <span class="form-text text-muted">Pilih tanggal lahir.</span>
      </div>
      <div class="form-group">
        <label>Tanggal jatuh Tempo</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:john.wick@reeves.com"
        />
        <span class="form-text text-muted">Pilih tanggal lahir.</span>
      </div>
      <div class="form-group">
        <label>Nilai Deposito</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Purwokerto selatan,Banyumas"
        />
        <span class="form-text text-muted">Masukkan alamat user.</span>
      </div>
    </div>

    <!--end: Wizard Step 1-->

    <!--begin: Wizard Actions -->
    <div class="d-flex justify-content-between border-top pt-10">
      <div class="mr-2">
        <button
          @click="cancel"
          type="button"
          class="btn btn-light-primary font-weight-bold text-uppercase px-9 py-4"
        >
          Batal
        </button>
      </div>
      <div>
        <button
          type="submit"
          class="btn btn-success font-weight-bold text-uppercase px-9 py-4"
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
import { ACTION_GET_DATA_SYSTEM, SGROUP, SROLE, SUSER } from "@/store";

export default {
  name: "FormUser",
  data: () => {
    return {
      id: "",
      username: "",
      password: "",
      email: "",
      role: "",
      group: "",
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
      this.getUserById(this.$route.params.id);
    }
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
