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
          >Masukkan Nasaba ayang akan dibuat rekening.</span
        >
      </div>

      <div class="form-group">
        <label>Pegawai</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Trian Damai"
          @click="dialognasabah = !dialognasabah"
        />
        <span class="form-text text-muted">Pegawai yang melayani.</span>
      </div>
      <div class="form-group">
        <label>Produk</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Trian Damai"
          @click="dialogpembiayaan = !dialogpembiayaan"
        />
        <span class="form-text text-muted">Produk yang dipakai.</span>
      </div>
      <div class="form-group">
        <label>Tanggal Pencairan</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:01-04-202"
        />
        <span class="form-text text-muted">Pilih tanggal pencairan.</span>
      </div>
      <div class="form-group">
        <label>jatuh Tempo</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: 01-04-2021"
        />
        <span class="form-text text-muted">Pilih tanggal jatuh tempo.</span>
      </div>
      <div class="form-group">
        <label>Lama Angsuran</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan durasi angsuran.</span>
      </div>
      <div class="form-group">
        <label>Tipe Angsuran</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan Tipe Angsuran.</span>
      </div>
      <div class="form-group">
        <label>Modal</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan jumlah modal.</span>
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
    <dialog-produk
      :show="dialogpembiayaan"
      @close="dialogpembiayaan = !dialogpembiayaan"
      @choose="dialogpembiayaan = !dialogpembiayaan"
    />
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { ACTION_GET_DATA_SYSTEM, SUSER } from "@/store";

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
      dialogpembiayaan: false,
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
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtye: SUSER,
          path: "users",
        })
        .then((res) => {
          if (res) this.getUsers();
        });
    },
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
