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
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Purwokerto selatan,Banyumas"
        />
        <span class="form-text text-muted">Masukkan alamat user.</span>
      </div>
      <div v-show="!isEdit" class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:Xdsrcs"
        />
        <span class="form-text text-muted">
          Kunci keamanan yang akan digunakan user.
        </span>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: bakaranproject@contoh.com"
        />
        <span class="form-text text-muted">Email aktif user.</span>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <div class="form-group">
            <label>Role</label>
            <select
              v-model="role"
              class="form-control form-control-solid form-control-lg"
            >
              <option value="">Pilih</option>

              <option
                v-for="(role, index) in roles"
                :key="index"
                :value="role.id"
                >{{ role.name }}</option
              >
            </select>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="form-group">
            <label>Group</label>
            <select
              v-model="group"
              class="form-control form-control-solid form-control-lg"
            >
              <option value="">Pilih</option>
              <option
                v-for="(group, index) in groups"
                :key="index"
                :value="group.id"
                >{{ group.name }}</option
              >
            </select>
          </div>
        </div>
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
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { ACTION_GET_DATA_SYSTEM, SUSER } from "@/store";

export default {
  name: "FormUser",
  props: {
    isEdit: Boolean,
  },
  data: {
    username: "",
    password: "",
    email: "",
    role: "",
    group: "",
  },
  created() {
    this.getRoles();
    this.getGroups();
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
  methods: {
    getRoles() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SUSER,
          path: "roles",
        })
        .then((res) => {
          if (!res) return;
          this.getRoles();
        });
    },
    getGroups() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SUSER,
          path: "groups",
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
          this.$emit("buttonsubmit", true);
        }
      } else {
        if (
          this.username &&
          this.password &&
          this.email &&
          this.role &&
          this.group
        ) {
          this.$emit("buttonsubmit", true);
        }
      }
    },
  },
};
</script>
