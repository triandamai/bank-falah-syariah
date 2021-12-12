/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@/services/api.service.js";
import {Promise} from "es6-promise";
import {defaultOptions} from "@/utils/AxisFormatter.js"

const STATISTIC = "STATISTIC"
const STATISTICNASABAH = "STATISTICNASABAH"
const STATISTICTRANSACTION = "STATISTICTRANSACTION"
const STATISTICACCOUNTTABUNGAN = "STATISTICACCOUNTTABUNGAN"

export const ACTION_GET_STATISTIC = `statistic/${STATISTIC}`
export const ACTION_GET_STATISTIC_NASABAH = `statistic/${STATISTICNASABAH}`
export const ACTION_GET_STATISTIC_TRANSACTION = `statistic/${STATISTICTRANSACTION}`
export const ACTION_GET_STATISTIC_ACCOUN_TABUNGAN = `statistic/${STATISTICACCOUNTTABUNGAN}`


const state = {
    totalnasabah: 0,
    totaltransaksi: 0,
    options: defaultOptions,
};
const getters = {};
const actions = {
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [STATISTIC]({commit}, {}) {
        return new Promise((resolve) => {
            ApiService.get("/statistics?days=10")
                .then(({success, data}) => {
                if (success) {
                    const data_nasabah = []
                    const data_transaksi = []
                    const data_label = []
                    let transaksi = 0;
                    let nasabah = 0;
                    let max = 0;
                    data.map(item => {
                        if (item.nasabah > max) {
                            max = item.nasabah;
                        }

                        if (item.transaksi > max) {
                            max = item.transaksi;
                        }
                        nasabah = nasabah + item.nasabah
                        transaksi = transaksi + item.transaksi
                        data_nasabah.push(item.nasabah)
                        data_transaksi.push(item.transaksi)
                        data_label.push(item.date)
                    })
                    commit(STATISTIC, {nasabah: nasabah, transaksi: transaksi})
                    resolve({
                        success: success,
                        data: {label: data_label, transaksi: data_transaksi, nasabah: data_nasabah, max: max}
                    });
                } else {
                    resolve({success: success, data: []});
                }
            })

        })
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [STATISTICNASABAH]({commit},{
        from,
        to
    }){
       return new Promise((resolve)=>{
           ApiService.get(`/statistics/total_nasabah?start_date=${from}&end_date=${to}`)
               .then(({success, data}) => {
                   if (success) {
                       const nasabah = []
                       const label = []

                       let max = 0;
                       data.map(item => {
                           if(item.jumlah_nasabah > max){
                               max=item.jumlah_nasabah
                           }
                           nasabah.push(item.jumlah_nasabah)
                           label.push(item.date)
                       })

                       resolve({
                           success: success,
                           data: {
                               label: label,
                               nasabah: nasabah,
                               max: max
                           }
                       });
                   } else {
                       resolve({success: success, data: []});
                   }
               })
       })
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [STATISTICTRANSACTION]({commit},{
        from,
        to
    }){
       return new Promise((resolve)=>{
           ApiService.get(`statistics/total_transaksi?start_date=${from}&end_date=${to}`)
               .then(({success, data}) => {
                   if (success) {
                       const label = []
                       const transaction = []
                       const transaction_kredit = []
                       const transaction_debit = []

                       let max = 0;
                       data.map(item => {
                           if(item.jumlah_transaksi > max){
                               max = item.jumlah_transaksi
                           }
                           if(item.jumlah_transaksi_kredit > max){
                               max = item.jumlah_transaksi_kredit
                           }
                           if(item.jumlah_transaksi_debet > max){
                               max = item.jumlah_transaksi_debet
                           }

                           label.push(item.date)
                           transaction.push(item.jumlah_transaksi)
                           transaction_kredit.push(item.jumlah_transaksi_kredit)
                           transaction_debit.push(item.jumlah_transaksi_debet)

                       })

                       resolve({
                           success: success,
                           data: {
                               label: label,
                               transaction: transaction,
                               transaction_debit: transaction_debit,
                               transaction_kredit: transaction_kredit,
                               max: max
                           }
                       });
                   } else {
                       resolve({success: success, data: []});
                   }
               })
       })
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [STATISTICACCOUNTTABUNGAN]({commit},{
        from,
        to
    }){
       return new Promise((resolve)=>{
           ApiService.get(`/statistics/total_simpanan?start_date=${from}&end_date=${to}`)
               .then(({success, data}) => {
                   if (success) {
                       const label = []
                       const account = []

                       let max = 0;
                       data.map(item => {
                           if(item.jumlah_rekening_simpanan > max){
                               max = item.jumlah_rekening_simpanan
                           }

                           label.push(item.date)
                           account.push(item.jumlah_rekening_simpanan)
                       })

                       resolve({
                           success: success,
                           data: {
                               label: label,
                               account:account,
                               max: max
                           }
                       });
                   } else {
                       resolve({success: success, data: []});
                   }
               })
       })
    }

};
const mutations = {
    [STATISTIC](state, {nasabah, transaksi}) {
        state.totalnasabah = nasabah
        state.totaltransaksi = transaksi
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
