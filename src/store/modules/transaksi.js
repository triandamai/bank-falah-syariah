/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@/services/api.service.js";
import router from "@/router";
import Vue from "vue";

export const TABUNGAN_TARIK_TUNAI = "TABUNGAN_TARIK_TUNAI";
export const TABUNGAN_TARIK_NONTUNAI = "TABUNGAN_TARIK_NONTUNAI";
export const TABUNGAN_SETOR_TUNAI = "TABUNGAN_SETOR_TUNAI";
export const TABUNGAN_SETOR_NONTUNAI = "TABUNGAN_SETOR_NONTUNAI";

export const PEMBIAYAAN_TARIK_TUNAI = "PEMBIAYAAN_TARIK_TUNAI";
export const PEMBIAYAAN_TARIK_NONTUNAI = "PEMBIAYAAN_TARIK_NONTUNAI";
export const PEMBIAYAAN_SETOR_TUNAI = "PEMBIAYAAN_SETOR_TUNAI";
export const PEMBIAYAAN_SETOR_NONTUNAI = "PEMBIAYAAN_SETOR_NONTUNAI";

const TRANSACTION = "TRANSACTION"
export const ACTION_TRANSACTION = `transaksi/${TRANSACTION}`

const state = {};
const getters = {};
const actions = {
    // eslint-disable-next-line no-unused-vars
    [TRANSACTION]({commit}, {payload, type}) {
        return new Promise((resolve) => {
            var endpoint = "";
            switch (type) {
                case  TABUNGAN_TARIK_TUNAI:
                    endpoint = "/transaksi/simpanan/tarik_tunai"
                    break
                case  TABUNGAN_TARIK_NONTUNAI:
                    endpoint = "/transaksi/simpanan/tarik_nontunai"
                    break
                case  TABUNGAN_SETOR_TUNAI:
                    endpoint = "/transaksi/simpanan/setor_tunai"
                    break
                case  TABUNGAN_SETOR_NONTUNAI:
                    endpoint = "/transaksi/simpanan/setor_nontunai"
                    break
                case  PEMBIAYAAN_TARIK_TUNAI:
                    endpoint = "/transaksi/pembiayaan/pencairan_tunai"
                    break
                case  PEMBIAYAAN_TARIK_NONTUNAI:
                    endpoint = "/transaksi/pembiayaan/pencairan_nontunai"
                    break
                case  PEMBIAYAAN_SETOR_TUNAI:
                    endpoint = "/transaksi/pembiayaan/setor_angsuran_tunai"
                    break
                case  PEMBIAYAAN_SETOR_NONTUNAI:
                    endpoint = "/transaksi/pembiayaan/setor_angsuran_nontunai"
                    break
            }

            ApiService.post(`${endpoint}`, payload).then(({status, data}) => {
                if (status === 200 || status === 201) {
                    if (data.status === 200 || data.status === 201) {
                        resolve({success: true, message: "Berhasil menyimpan"});
                    } else {
                        resolve({success: false, message: "Terjadi Kesalahan"})
                    }
                } else {
                    resolve({success: false, message: "Terjadi Kesalahan"})
                }
            }).catch(({response}) => {
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
    }
};
const mutations = {};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
