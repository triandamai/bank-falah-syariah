/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";
import {decrypt} from "@/services/jwt.service"
import {formatCurrency} from "@/utils/utils";

/***
 * dspatch type
 */
const GET_DATA_REKENING = "GETDATAREKENING";
const POST_DATA_REKENING = "POSTREKENINGDATA";
const PUT_DATA_REKENING = "PUTDATAREKENING";
const DELETE_DATA_REKENING = "DELETEDATAREKENING";
const GET_SALDO_REKENING = "GET_SALDO_REKENING";
const MUTASI = "MUTASI"
export const MUTASI_PEMBIAYAAN = 'rekening_pembiayaan/'
export const MUTASI_SIMPANAN = 'rekening_simpanan/'

export const ACTION_GET_DATA_REKENING = `rekening/${GET_DATA_REKENING}`;
export const ACTION_POST_DATA_REKENING = `rekening/${POST_DATA_REKENING}`;
export const ACTION_PUT_DATA_REKENING = `rekening/${PUT_DATA_REKENING}`;
export const ACTION_DELETE_DATA_REKENING = `rekening/${DELETE_DATA_REKENING}`;
export const ACTION_MUTASI = `rekening/${MUTASI}`;
export const ACTION_GET_SALDO = `rekening/${GET_SALDO_REKENING}`

const ADD_DATA_REKENING = "MADDDATAREKENING";
const EDIT_DATA_REKENING = "MUPDATEREKENING";
const REMOVE_DATA_REKENING = "MDELETEDATAREKENING";
const INCREMENT_PAGE = `INCREMENT`;
const MUTASI_REKENING = "MUTASI_REKENING"
const DESTROY_MUTASI = "DESTROY MUTASI"
const SET_SALDO = "SETSALDO"

export const MUTATION_ADD_DATA_REKENING = `rekening/${ADD_DATA_REKENING}`;
export const MUTATION_UPDATE_DATA_REKENING = `rekening/${EDIT_DATA_REKENING}`;
export const MUTATION_DELETE_DATA_REKENING = `rekening/${REMOVE_DATA_REKENING}`;
export const MUTATION_DESTROY_MUTASI = `rekening/${DESTROY_MUTASI}`;
/***
 *
 * type Action
 *
 */
export const RTABUNGAN = "rekening_simpanan";
export const RDEPOSITO = "rekening_deposito";
export const RPEMBIAYAAN = "rekening_pembiayaan";

const state = {
    datadeposito: [],
    deposito: {
        dialog: false,
        current_page: 1,
        last_page: 0,
    },
    datapembiayaan: [],
    pembiayaan: {
        dialog: false,
        current_page: 1,
        last_page: 0,
    },
    datasimpanan: [],
    tabungan: {
        dialog: false,
        current_page: 1,
        last_page: 0,
    },
    mutasi: {
        pembiayaan: [],
        simpanan: []
    },
    saldo: {
        pembiayaan: {
            saldo: 0,
            jumlah_pinjaman: 0
        },
        simpanan: {
            jumlahpinjaman: 0
        }
    }
};
const getters = {
    saldoPembiayaan: state => formatCurrency(state.mutasi.pembiayaan.map(mutasi => mutasi.value).reduce((prev, next) => prev + next, 0)),
    saldoSimpanan: state => formatCurrency(state.mutasi.simpanan.map(mutasi => mutasi.value).reduce((prev, next) => prev + next, 0))
};
const actions = {
    /***
     * get all data rekening deposito/pembiayaan/simpanan
     * @param {type,path}
     *  @returns data array and after success adding to @global data array
     *
     * @param type
     */
    [GET_DATA_REKENING]({commit, state}, {type}) {
        return new Promise((resolve) => {
            //cek pagination (get current page)
            let page = `?page=`;
            //for mutation the pagination going forward or stop
            let stillPaging = false;

            switch (type) {
                case RTABUNGAN:
                    page += state.tabungan.current_page;
                    break;
                case RDEPOSITO:
                    page += state.deposito.current_page;
                    break;
                case RPEMBIAYAAN:
                    page += state.pembiayaan.current_page;
                    break;
            }

            //get
            ApiService.get(`${type}${page}`)
                .then(({data, shouldNext}) => {
                    //success
                    resolve(shouldNext)
                    data.map((item) => {
                        commit(ADD_DATA_REKENING, {
                            type: type,
                            item: item,
                            page: stillPaging,
                        });
                    });
                })
        });
    },

    [MUTASI]({commit}, {type, no_rekening}) {
        return new Promise((resolve) => {
            const decrypt_no_rekening = decrypt(no_rekening)
            ApiService.get(`${type}${decrypt_no_rekening}/mutasi?t=${new Date().getMilliseconds()}`)
                .then(({success, data}) => {
                    resolve(success)
                    data.map(mutasi => {

                        commit(MUTASI_REKENING, {type: type, mutasi: mutasi})
                    })

                })
        })
    },
    [GET_SALDO_REKENING]({commit}, {type, no_rekening}) {
        return new Promise((resolve) => {
            const decrypt_no_rekening = decrypt(no_rekening)
            ApiService.get(`${type}${decrypt_no_rekening}/saldo?t=${new Date().getMilliseconds()}`)
                .then(({success, data}) => {
                    resolve(success)
                    commit(SET_SALDO, {type: type, saldo: data})
                })
        })
    },
    /***
     * save data
     * @param commit
     * @param type
     * @param body
     */
    [POST_DATA_REKENING]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.post(`${type}`, body)
                .then(({success, message, data}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(ADD_DATA_REKENING, {
                            type: type,
                            item: data[0],
                            page: false,
                        });

                    }
                })
        });
    },
    /***
     * update/edit data
     */
    [PUT_DATA_REKENING]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.put(`${type}/${body.id}`, body)
                .then(({success, message, data}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(EDIT_DATA_REKENING, {
                            type: type,
                            data: data[0],
                            olddata: body,
                        });

                    }
                })

        });
    },
    /***
     * delete pembiayaan
     * @param commit
     * @param type
     * @param body
     */
    [DELETE_DATA_REKENING]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.delete(`${type}/${body.id}`)
                .then(({success, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(REMOVE_DATA_REKENING, {
                            type: type,
                            data: body,
                        });

                    }
                })
        });
    },
    /***
     * delete pembiayaan
     *
     */
};
const mutations = {
    [MUTASI_REKENING](state, {type, mutasi}) {

        if (type === MUTASI_PEMBIAYAAN) {
            const exist = state
                .mutasi
                .pembiayaan
                .some((pembiayaan) => pembiayaan.id === mutasi.id);
            if (exist) {
                const index = state.mutasi.pembiayaan
                    .map((pembiayaan) => pembiayaan.id)
                    .indexOf(mutasi.id);
                Object.assign(state.mutasi.pembiayaan[index], mutasi);
            } else {
                state.mutasi.pembiayaan.push(mutasi)
            }
        }
        if (type === MUTASI_SIMPANAN) {
            const exist = state
                .mutasi
                .simpanan
                .some((simpanan) => simpanan.id === mutasi.id);
            if (exist) {
                const index = state.mutasi.simpanan
                    .map((simpanan) => simpanan.id)
                    .indexOf(mutasi.id);
                Object.assign(state.mutasi.simpanan[index], mutasi);
            } else {
                state.mutasi.simpanan.push(mutasi)
            }

        }
    },
    [DESTROY_MUTASI](state, {type}) {
        if (type === MUTASI_PEMBIAYAAN) {
            state.mutasi.pembiayaan = []
        } else {
            state.mutasi.simpanan = []
        }
    },
    [INCREMENT_PAGE](state, {type}) {
        switch (type) {
            case RPEMBIAYAAN:
                state.pembiayaan.current_page++;
                break;
            case RTABUNGAN:
                state.tabungan.current_page++;
                break;
            case RDEPOSITO:
                state.deposito.current_page++;
                break;
        }
    },
    [SET_SALDO](state, {saldo, type}) {

        if (type === MUTASI_PEMBIAYAAN) {

            state.saldo.pembiayaan = saldo
        } else {
            state.saldo.simpanan = saldo
        }
    },
    /***
     * Rekening add data dynamicly
     * {@param state
   * @param type
   * @param item}
     * @param page
     * @returns each data array will increment smoothly
     */
    [ADD_DATA_REKENING](state, {type, item, page}) {
        //push data with type rekening assosiated
        if (type === RPEMBIAYAAN) {
            const exist = state.datapembiayaan.some((pembiayaan) => pembiayaan.id === item.id);
            if (!exist) {
                state.datapembiayaan.push(item);
            }
        }
        if (type === RTABUNGAN) {
            const exist = state.datasimpanan.some((tabungan) => tabungan.id === item.id);
            if (!exist) {
                state.datasimpanan.push(item);
            }
        }
        if (type === RDEPOSITO) {
            const exist = state.datadeposito.some((deposito) => deposito.id === item.id);
            if (!exist) {
                state.datadeposito.push(item);
            }
        }

    },
    /***
     * update data
     * {@param state
   * @param type,
   * @param data
   * @param olddata}
     * @returns update data
     */
    [EDIT_DATA_REKENING](state, {type, data, olddata}) {
        //get type rekening
        if (type === RTABUNGAN) {
            //update to data
            const index = state.datasimpanan
                .map((tabungan) => tabungan.id)
                .indexOf(olddata.id);
            Object.assign(state.datasimpanan[index], data);
        }
        if (type === RDEPOSITO) {
            const index = state.datadeposito
                .map((deposito) => deposito.id)
                .indexOf(olddata.id);
            Object.assign(state.datadeposito[index], data);
        }
        if (type === RPEMBIAYAAN) {
            const index = state.datapembiayaan
                .map((pembiayaan) => pembiayaan.id)
                .indexOf(olddata.id);
            Object.assign(state.datapembiayaan[index], data);

        }

    },
    /***
     * delete data
     * @param {state,type,data}
     * @param state
     */
    [REMOVE_DATA_REKENING](state, {type, data}) {
        if (type === RDEPOSITO) {
            const index = state.datadeposito
                .map((deposito) => deposito.id)
                .indexOf(data.id);
            state.datadeposito.splice(index, 1);
        }
        if (type === RPEMBIAYAAN) {
            const index = state.datapembiayaan
                .map((deposito) => deposito.id)
                .indexOf(data.id);
            state.datapembiayaan.splice(index, 1);
        }
        if (type === RTABUNGAN) {
            const index = state.datasimpanan
                .map((deposito) => deposito.id)
                .indexOf(data.id);
            state.datasimpanan.splice(index, 1);
        }

    }
}
export default {namespaced: true, state, getters, actions, mutations};
