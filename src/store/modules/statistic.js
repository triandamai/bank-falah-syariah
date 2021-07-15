/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@/services/api.service.js";



const REKENING = "REKENING"
const TRANSACTION = "TRANSACTION"
export const ACTION_GET_TRANSACTION_STATISTIC = `statistic/${TRANSACTION}`
export const ACTION_GET_NASABAH_STATISTIC = `statistic/${REKENING}`

export const MUTATION_GET_TRANSACTION_STATISTIC = `statistic/${TRANSACTION}`
export const MUTATION_GET_NASABAH_STATISTIC = `statistic/${REKENING}`


const state = {
    series:[
        {
            name:"Transaction",
            data:[]
        },
        {
            name:"Rekening",
            data:[]
        }
    ]
};
const getters = {};
const actions = {
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [TRANSACTION]({commit}, {}) {
        return new Promise(resolve => {
           ApiService.get("/statistics/transaksi").then(({status,data})=>{
               if (status == 200 || status == 201) {
                   if (data.current_page >= data.last_page) {
                       resolve(false);
                   } else {
                       resolve(true);

                   }
               } else {
                   resolve(false);
               }
           })

        })
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [REKENING]({commit}, {}) {
        return new Promise(resolve => {
            ApiService.get("/statistics/nasabah?days=100").then(({status,data})=>{
                if (status == 200 || status == 201) {
                    if (data.current_page >= data.last_page) {
                        resolve(false);
                    } else {
                        resolve(true);

                    }
                } else {
                    resolve(false);
                }
            })
        })
    }
};
const mutations = {
    [TRANSACTION](state,data){
        state[0].data = data
    },
    [REKENING](state,data){
        state[1].data = data
    },

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
