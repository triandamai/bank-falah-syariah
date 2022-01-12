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
import {Promise} from "es6-promise";
import dummy_history_pembiayaan from "@/data/dummy_history_pembiayaan.json"
import dummy_detail from "@/data/dummy_detail_rekening.json"

/***
 * dspatch type
 */
const GET_DATA_REKENING = "GETDATAREKENING"
const POST_DATA_REKENING = "POSTREKENINGDATA"
const PUT_DATA_REKENING = "PUTDATAREKENING"
const DELETE_DATA_REKENING = "DELETEDATAREKENING"
const GET_SALDO_REKENING = "GET_SALDO_REKENING"
const GET_MUTASI_REKENING = "GET_MUTASI_REKENING"
const GET_HISTORY_PEMBIAYAAN = "GETHISTORYPEMBIAYAAN"
const GET_DETAIL_REKENING_PEMBIAYAAN = "GET_DETAIL_REKENING_PEMBIAYAAN "

const DETAIL_REKENING = "DETAIL_REKENING"
export const DETAIL_REKENING_PEMBIAYAAN = 'rekening_pembiayaan/'
export const DETAIL_REKENING_SIMPANAN = 'rekening_simpanan/'

export const ACTION_GET_MUTASI = `rekening/${GET_MUTASI_REKENING}`
export const ACTION_GET_DATA_REKENING = `rekening/${GET_DATA_REKENING}`;
export const ACTION_POST_DATA_REKENING = `rekening/${POST_DATA_REKENING}`;
export const ACTION_PUT_DATA_REKENING = `rekening/${PUT_DATA_REKENING}`;
export const ACTION_DELETE_DATA_REKENING = `rekening/${DELETE_DATA_REKENING}`;
export const ACTION_GET_DETAIL_REKENING = `rekening/${DETAIL_REKENING}`;
export const ACTION_GET_SALDO = `rekening/${GET_SALDO_REKENING}`
export const ACTION_GET_HISTORY_PEMBIAYAAN = `rekening/${GET_HISTORY_PEMBIAYAAN}`
export const ACTION_GET_DETAIL_REKENING_PEMBIAYAAN = `rekening/${GET_DETAIL_REKENING_PEMBIAYAAN}`

const ADD_DATA_REKENING = "MADDDATAREKENING";
const EDIT_DATA_REKENING = "MUPDATEREKENING";
const REMOVE_DATA_REKENING = "MDELETEDATAREKENING";
const INCREMENT_PAGE = `INCREMENT`;
const SET_DETAIL_REKENING = "DETAIL_REKENING"
const SET_MUTASI="SET_MUTASI_REKENING"
const DESTROY_MUTASI = "DESTROY MUTASI"
const SET_SALDO = "SETSALDO"
const SET_JUMLAH_PINJAMAN = "JUMLAHPINJAMAN"
const SET_HISTORY_PEMBIAYAAN = "SETHISTORYPEMBIAYAAN"
const SET_DETAIL_REKENING_NASABAH = "SETDETAILREKENINGNASABAH"

export const MUTATION_ADD_DATA_REKENING = `rekening/${ADD_DATA_REKENING}`;
export const MUTATION_UPDATE_DATA_REKENING = `rekening/${EDIT_DATA_REKENING}`;
export const MUTATION_DELETE_DATA_REKENING = `rekening/${REMOVE_DATA_REKENING}`;
export const MUTATION_DESTROY_MUTASI = `rekening/${DESTROY_MUTASI}`;
export const MUTATION_ADD_MUTASI = `rekening/${SET_DETAIL_REKENING}`;

/***
 *
 * type Action
 *
 */
export const RTABUNGAN = "rekening_simpanan";
export const RPEMBIAYAAN = "rekening_pembiayaan";

const state = {
    datapembiayaan: [],
    pembiayaan: {
        dialog: false,
        current_page: 1,
        last_page: 0,
    },
    datasimpanan: [],
    mutasi:{
        pembiayaan:[],
        simpanan:[]
    },
    tabungan: {
        dialog: false,
        current_page: 1,
        last_page: 0,
    },
    detailrekening: {
        pembiayaan: [],
        simpanan: [],
        nasabah:{}
    },
    history_pembiayaan:[],
    saldo: {
        pembiayaan: {
            saldo: 0,
            jumlah_pinjaman: 0,
            cicilan_perbulan:0,
            cicilan_pokok:0,
            margin:0
        },
        simpanan: {
            saldo:0,
            jumlahpinjaman: 0
        }
    }
};
const getters = {
    saldoSimpanan: state => formatCurrency(state.saldo.simpanan.saldo)
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
                .then(({success,data, shouldNext}) => {

                    if (success) {
                        resolve(shouldNext)
                        if (shouldNext) {
                            commit(INCREMENT_PAGE, {type: type})
                        }

                    }else {
                        resolve(false)
                    }
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
    [GET_MUTASI_REKENING]({commit,state},{type,no_rekening,start,end}){
        return new Promise((resolve)=>{
            ApiService.get(`${type}/${no_rekening}/mutasi?start_date=${start}&end_date=${end}`)
                .then(({success,data}) => {
                    resolve(success)

                    commit(SET_MUTASI,{type:type,data:data})

                })
        })
    },
    [DETAIL_REKENING]({commit}, {type, no_rekening}) {
        return new Promise((resolve) => {
            const decrypt_no_rekening = decrypt(no_rekening)
            console.log(decrypt_no_rekening)
            ApiService.get(`${type}${decrypt_no_rekening}/mutasi?t=${new Date().getMilliseconds()}`)
                .then(({success, data}) => {
                    resolve(success)
                    if(data.length > 0){
                        commit(SET_DETAIL_REKENING_NASABAH,data[0].nasabah)
                    }
                    data.map(data => {
                        commit(SET_DETAIL_REKENING, {type: type, detail: data})
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
    [GET_DETAIL_REKENING_PEMBIAYAAN]({commit},no_rekening){
        return new Promise((resolve)=>{
            const decrypt_no_rekening = decrypt(no_rekening)
                ApiService.get(`rekening_pembiayaan/detail?no_rekening=${decrypt_no_rekening}`)
                    .then(({success,data})=> {
                        resolve(success)
                        let datas = dummy_detail
                        commit(SET_JUMLAH_PINJAMAN,{
                            jumlah_pinjaman:datas.data[0].jumlah_angsuran,
                            uang_muka : datas.data[0].total_uang_muka
                        })

                    })
        })
    },
    [GET_HISTORY_PEMBIAYAAN]({commit},no_rekening){
        return new Promise((resolve)=>{
            const decrypt_no_rekening = decrypt(no_rekening)
            ApiService.get(`rekening_pembiayaan/history_angsuran?no_rekening=${decrypt_no_rekening}`)
                .then(({success,data})=>{
                    resolve(success)
                    let datas = dummy_history_pembiayaan.data
                    let set =   {
                        saldo: datas.saldo,
                        cicilan_perbulan:datas.cicilan_perbulan,
                        cicilan_pokok :datas.cicilan_pokok,
                        margin:datas.margin,
                    }
                    commit(SET_HISTORY_PEMBIAYAAN,datas.history_angsuran)
                    commit(SET_SALDO,{type:DETAIL_REKENING_PEMBIAYAAN,saldo:set})
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
    [SET_MUTASI](state,{type,data}){

        if (type === RPEMBIAYAAN) {
            state.mutasi.pembiayaan =data
        }
        if (type === RTABUNGAN) {
            state.mutasi.simpanan = data
        }


    },
    [SET_DETAIL_REKENING](state, {type, detail}) {


        if (type === DETAIL_REKENING_PEMBIAYAAN) {
            const exist = state
                .detailrekening
                .pembiayaan
                .some((pembiayaan) => pembiayaan.id === detail.id);
            if (exist) {
                const index = state.detailrekening.pembiayaan
                    .map((pembiayaan) => pembiayaan.id)
                    .indexOf(detail.id);
                Object.assign(state.detailrekening.pembiayaan[index], detail);
            } else {
                state.detailrekening.pembiayaan.push(detail)
            }
        }
        if (type === DETAIL_REKENING_SIMPANAN) {
            const exist = state
                .detailrekening
                .simpanan
                .some((simpanan) => simpanan.id === detail.id
                
                );
            if (exist) {
                const index = state.detailrekening.simpanan
                    .map((simpanan) => simpanan.id)
                    .indexOf(detail.id);
                Object.assign(state.detailrekening.simpanan[index], detail);
            } else {
                state.detailrekening.simpanan.push(detail)
            }

        }
    },
    [DESTROY_MUTASI](state, {type}) {
        if (type === DETAIL_REKENING_PEMBIAYAAN) {
            state.mutasi.pembiayaan = []
            state.detailrekening.pembiayaan =[]
        } else {
            state.mutasi.simpanan = []
            state.detailrekening.simpanan=[]

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
    [SET_JUMLAH_PINJAMAN](state,jumlah){
        state.saldo.pembiayaan.jumlah_pinjaman = jumlah.jumlah_pinjaman
        state.saldo.pembiayaan.uang_muka = jumlah.uang_muka
    },
    [SET_HISTORY_PEMBIAYAAN](state,history){
        state.history_pembiayaan = history
    },
    [SET_SALDO](state, {saldo, type}) {
        if (type === DETAIL_REKENING_PEMBIAYAAN) {
            state.saldo.pembiayaan.saldo = saldo.saldo
            state.saldo.pembiayaan.margin = saldo.margin
            state.saldo.pembiayaan.cicilan_perbulan = saldo.cicilan_perbulan
            state.saldo.pembiayaan.cicilan_pokok = saldo.cicilan_pokok

        } else {
            state.saldo.simpanan.saldo = saldo
        }
    },
    [SET_DETAIL_REKENING_NASABAH](state,nasabah){
      state.mutasi.nasabah = nasabah
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
