/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@/services/api.service.js";
import {Promise} from "es6-promise";

//equiv simpanan
export const TABUNGAN_TARIK = "TABUNGAN_TARIK";
export const TABUNGAN_SETOR = "TABUNGAN_SETOR";
export const TABUNGAN_DEPOSITO = "TABUNGAN_DEPOSITO";
export const TABUNGAN_TRANSFER = "TABUNGAN_TRANSFER";

//equiv
export const PEMBIAYAAN_SETOR = "PEMBIAYAAN_SETOR";
export const PEMBIAYAAN_TARIK = "PEMBIAYAAN_TARIK";



const TRANSACTION = "TRANSACTION"
const GET_REKENING_TRANSACTION = "GET_REKENING_TRANSACTION"
const SET_REKENING_TRANSACTION = "SET_REKENING_TRANSACTION"
export const ACTION_TRANSACTION = `transaksi/${TRANSACTION}`
export const ACTION_GET_REKENING_TRANSACTION = `transaksi/${GET_REKENING_TRANSACTION}`

const state = {
    rekening:[]
};
const getters = {};
const actions = {
    [GET_REKENING_TRANSACTION]({commit},transaction){
        return new Promise((resolve)=>{

            let endPoint = ()=>{
                if(transaction === PEMBIAYAAN_TARIK) return `/rekening_pembiayaan`
                if(transaction === PEMBIAYAAN_SETOR) return `/rekening_pembiayaan`
                if(transaction === TABUNGAN_TARIK) return `/rekening_simpanan`
                if(transaction === TABUNGAN_SETOR) return `/rekening_simpanan`
                if(transaction === TABUNGAN_DEPOSITO) return `/rekening_simpanan`
                if(transaction === TABUNGAN_TRANSFER) return `/rekening_simpanan`
            }
            ApiService.get(endPoint()).then(({success,data,message})=>{
                if(success){
                    resolve({success:success,data:data,message:message})
                    commit(SET_REKENING_TRANSACTION,data)
                }
            })

        })
    },
    // eslint-disable-next-line no-unused-vars
    [TRANSACTION]({commit}, {payload, type}) {
        return new Promise((resolve) => {
            let endpoint = "";
            switch (type) {
                case  TABUNGAN_TARIK:
                    endpoint = "/transaksi/simpanan/tarik_tunai"
                    break
                case  TABUNGAN_SETOR:
                    endpoint = "/transaksi/simpanan/setor_tunai"
                    break
                case  TABUNGAN_TRANSFER:
                    endpoint = "/transaksi/pembiayaan/setor_angsuran_tunai"
                    break
                case  TABUNGAN_DEPOSITO:
                    endpoint = "/transaksi/simpanan/setor_nontunai"
                    break
                case  PEMBIAYAAN_SETOR:
                    endpoint = "/transaksi/pembiayaan/pencairan_tunai"
                    break
                case  PEMBIAYAAN_TARIK:
                    endpoint = "/transaksi/pembiayaan/pencairan_nontunai"
                    break

            }

            ApiService.post(`${endpoint}`, payload)
                .then(({success, message}) => {
                    resolve({success: success, message: message});
            })
        });
    }
};
const mutations = {
    [SET_REKENING_TRANSACTION](state,data){
        state.rekening = data
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
