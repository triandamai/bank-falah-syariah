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
          @click="dialog = !dialog"
        />
        <span class="form-text text-muted">Masukkan alamat user.</span>
      </div>

      <div class="form-group">
        <label>Pegawai</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: bakaranproject@contoh.com"
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
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { ACTION_GET_DATA_SYSTEM, SGROUP, SROLE, SUSER } from "@/store";

export default {
  name: "FormUser",
  props: {
    isEdit: Boolean,
  },
  data: () => {
    return {
      id: "",
      username: "",
      password: "",
      email: "",
      role: "",
      group: "",
      dialog: false,
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
    this.getRoles();
    this.getGroups();
  },
  methods: {
    getUserById(id) {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SUSER,
          path: `user/${id}`,
          id: id,
        })
        .then(() => {
          this.id = this.$store.state.system.datausers[0].id;
          this.username = this.$store.state.system.datausers[0].username;
          this.password = this.$store.state.system.datausers[0].password;
          this.email = this.$store.state.system.datausers[0].email;
          this.role = this.$store.state.system.datausers[0].role[0].id;
          this.group = this.$store.state.system.datausers[0].group[0].id;
        });
    },
    getRoles() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SROLE,
          path: "roles",
          id: null,
        })
        .then((res) => {
          if (!res) return;
          this.getRoles();
        });
    },
    getGroups() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SGROUP,
          path: "groups",
          id: null,
        })
        .then((res) => {
          if (!res) return;
          this.getGroups();
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    clear() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.role = "";
      this.group = "";
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
