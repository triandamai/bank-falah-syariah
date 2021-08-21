/* eslint-disable */
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";
import router from "@/router";
import Vue from "vue";
// action types

const POST_NASABAH = "createUser";
const PUT_NASABAH = "updateNasabah";
const GET_NASABAH = "getNasabah";
const DELETE_NASABAH = "deleteNasabah";
const IMPORT_NASABAH = "importnasabah";

export const ACTION_POST_NASABAH = `nasabah/${POST_NASABAH}`;
export const ACTION_PUT_NASABAH = `nasabah/${PUT_NASABAH}`;
export const ACTION_GET_NASABAH = `nasabah/${GET_NASABAH}`;
export const ACTION_DELETE_NASABAH = `nasabah/${DELETE_NASABAH}`;
export const ACTION_IMPORT_NASABAH = `nasabah/${IMPORT_NASABAH}`;

// mutation types
const SET_ERROR = "setError";
const ADD_NASABAH = "tambahnasabah";
const EDIT_NASABAH = "editnasabah";
const REMOVE_NASABAH = "deletenasabah";

const INCREMENT_PAGE = `INCREMENT`;

export const MUTATION_SET_ERROR = `nasabah/${SET_ERROR}`;
export const MUTATION_ADD_NASABAH = `nasabah/${ADD_NASABAH}`;
export const MUTATION_PUT_NASABAH = `nasabah/${EDIT_NASABAH}`;
export const MUTATION_DELETE_NASABAH = `nasabah/${REMOVE_NASABAH}`;
//
const state = {
    errors: null,
    currentpage: 0,
    lastpage: "",
    datanasabah: [],
};

const getters = {};

const actions = {
    /**
     *
     * @param {*} param0
     * @param {*} data
     * @returns Should goto next page ?
     */
    [GET_NASABAH]({commit, state}, data) {
        return new Promise((resolve) => {
            let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
            ApiService.get(`nasabah${page}?zx=4sc43f8sdnds7er`)
                .then(({data,shouldNext}) => {
                     resolve(shouldNext)
                     //loop and add to datatable
                     data.map((item) => {
                        commit(ADD_NASABAH, item);
                     });
                })
        });
    },
    /**
     *
     * @param {*} param0
     * @param {*} body
     * @returns
     */
    [POST_NASABAH]({commit}, body) {
        return new Promise((resolve, reject) => {
            ApiService.post("nasabah", body)
                .then(({status, data}) => {
                    if (status === 200 || status === 201) {


                        commit(ADD_NASABAH, data.data[0]);
                        resolve({success: true, message: "Berhasil menyimpan"});
                    } else {
                        resolve({
                            success: false,
                            message: "Gagal menyimpan,pastikan data sudah benar!",
                        });
                    }
                })
                .catch(({response}) => {
                    if (response.status === 401) {
                        resolve({
                            success: false,
                            message: "Anda tidak memeiliki izin melakuka operasi ini!",
                        });
                        setTimeout(() => {
                            router.push({path: "/unlock"})
                        }, 3200)
                        Vue.swal({
                            title: 'Sesi Berakhir atau Akun terhubung di perangkat lain!',
                            html: 'Anda akan diarahkan ke halaman masuk.',
                            timer: 3000
                        })
                    }else if(response.status === 400){
                        resolve({
                            success: false,
                            message: response.data.error,
                        });
                    }else {
                        resolve({
                            success: false,
                            message: response.message,
                        });
                    }
                });
        });
    },
    /**
     *
     * @param {*} param0
     * @param {*} body
     * @returns
     */
    [IMPORT_NASABAH]({commit}, body) {
        return new Promise((resolve, reject) => {
            ApiService.post("nasabah/import", body)
                .then(({status, data}) => {
                    if (status === 200 || status === 201) {
                        data.data.map((item) => {
                            commit(ADD_NASABAH, item);
                        });
                        resolve({success: true, message: "Berhasil import data nasabah"});
                    } else {
                        resolve({
                            success: false,
                            message: "Gagal import,pastikan data sudah benar!",
                        });
                    }
                })
                .catch(({response}) => {
                    if (response.status === 401) {
                        resolve({
                            success: false,
                            message: "Anda tidak memeiliki izin melakuka operasi ini!",
                        });
                        setTimeout(() => {
                            router.push({path: "/unlock"})
                        }, 3200)
                        Vue.swal({
                            title: 'Sesi Berakhir atau Akun terhubung di perangkat lain!',
                            html: 'Anda akan diarahkan ke halaman masuk.',
                            timer: 3000
                        })
                    }else if(response.status === 400){
                        resolve({
                            success: false,
                            message: response.data.error,
                        });
                    }else {
                        resolve({
                            success: false,
                            message: response.message,
                        });
                    }
                });
        });
    },
    /**
     *
     * @param {*} param0
     * @param {*} body
     * @returns
     */
    [PUT_NASABAH]({commit}, body) {
        return new Promise((resolve, reject) => {
            ApiService.put(`nasabah/${body.id}`, body)
                .then(({status, data}) => {
                    if (status === 200 || status === 201) {
                        commit(EDIT_NASABAH, {data: data.data[0], olddata: body});
                        resolve({success: true, message: "Berhasil mengubah"});
                    } else {
                        resolve({
                            success: false,
                            message: "Gagal mengubah,pastikan data sudah benar!",
                        });
                    }
                })
                .catch(({response}) => {
                    if (response.status === 401) {
                        resolve({
                            success: false,
                            message: "Anda tidak memeiliki izin melakuka operasi ini!",
                        });
                        setTimeout(() => {
                            router.push({path: "/unlock"})
                        }, 3200)
                        Vue.swal({
                            title: 'Sesi Berakhir atau Akun terhubung di perangkat lain!',
                            html: 'Anda akan diarahkan ke halaman masuk.',
                            timer: 3000
                        })
                    }else if(response.status === 400){
                        resolve({
                            success: false,
                            message: response.data.error,
                        });
                    }else {
                        resolve({
                            success: false,
                            message: response.message,
                        });
                    }
                });
        });
    },
    /**
     *
     * @param {*} param0
     * @param {*} body
     * @returns
     */
    [DELETE_NASABAH]({commit}, body) {
        return new Promise((resolve) => {
            ApiService.delete(`nasabah/${body.id}`, body)
                .then(({status, data}) => {
                    if (status === 200 || status === 201) {
                        commit(REMOVE_NASABAH, body);
                        resolve({success: true, message: "Berhasil"});
                    } else {
                        resolve({
                            success: false,
                            message: "Gagal menhapus,pastikan data sudah benar!",
                        });
                    }
                })
                .catch(({response}) => {
                    if (response.status === 401) {
                        resolve({
                            success: false,
                            message: "Anda tidak memeiliki izin melakuka operasi ini!",
                        });
                        setTimeout(() => {
                            router.push({path: "/unlock"})
                        }, 3200)
                        Vue.swal({
                            title: 'Sesi Berakhir atau Akun terhubung di perangkat lain!',
                            html: 'Anda akan diarahkan ke halaman masuk.',
                            timer: 3000
                        })
                    }else if(response.status === 400){
                        resolve({
                            success: false,
                            message: response.data.error,
                        });
                    }else {
                        resolve({
                            success: false,
                            message: response.message,
                        });
                    }
                });
        });
    },
};

const mutations = {
    [SET_ERROR](state, data) {
        state.errors = data;
    },
    [INCREMENT_PAGE](state) {
        state.currentpage = state.currentpage + 1;
    },
    [ADD_NASABAH](state, data) {
        var exsts = state.datanasabah.some((nasabah) => {
            return nasabah.id === data.id;
        });
        if (!exsts) {
            state.datanasabah.push(data);
        }
    },
    [EDIT_NASABAH](state, {data, olddata}) {
        var index = state.datanasabah
            .map((nasabah) => nasabah.id)
            .indexOf(olddata.id);
        Object.assign(state.datanasabah[index], data);
    },
    [REMOVE_NASABAH](state, data) {
        var index = state.datanasabah.map((nasabah) => nasabah.id).indexOf(data.id);
        state.datanasabah.splice(index);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
