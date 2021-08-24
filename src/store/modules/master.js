/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";

const GETDATAMASTER = `GETDATAMASTER`;
const POSTDATAMASTER = `POSTMASTERDATA`;
const PUTDATAMASTER = `PUTMASTERDATA`;
const DELETEDATAMASTER = `DELETEMASTERDATA`;

export const ACTION_GET_DATA_MASTER = `master/${GETDATAMASTER}`;
export const ACTION_POST_DATA_MASTER = `master/${POSTDATAMASTER}`;
export const ACTION_PUT_DATA_MASTER = `master/${PUTDATAMASTER}`;
export const ACTION_DELETE_DATA_MASTER = `master/${DELETEDATAMASTER}`;

const ADDDATAMASTER = `ADDDATAMASTER`;
const EDITDATAMASTER = `EDITDATAMASTER`;
const REMOVEDATAMASTER = `REMOVEDATAMASTER`;
const INCREMENT_PAGE = `INCREMENT`;

export const MUTATION_ADD_DATA_MASTER = `master/${ADDDATAMASTER}`;
export const MUTATION_PUT_DATA_MASTER = `master/${EDITDATAMASTER}`;
export const MUTATION_DELETE_DATA_MASTER = `master/${REMOVEDATAMASTER}`;

export const MAKAD = "akad";
export const MPRODUK = "produk";
export const MJABATAN = "jabatan";
export const MPEGAWAI = "pegawai";
export const MJENISTRANSAKSI = "jenis-transaksi";

const state = {
    dataakad: [],
    akad: {
        current_page: 1,
        last_page: 0,
    },
    datajenistransaksi: [],
    jenistransaksi: {
        current_page: 1,
        last_page: 0,
    },
    dataproduk: [],
    produk: {
        current_page: 0,
        last_page: 0,
    },
    datajabatan: [],
    jabatan: {
        current_page: 1,
        last_page: 0,
    },
    datapegawai: [],
    pegawai: {
        current_page: 1,
        last_page: 0,
    },
    formpegawai: {},
};
const getters = {};
const actions = {
    /***
     * get data
     * @param {type,path,id}
     * @returns prmise true/false
     * and add data to array smoothly
     * @param type
     */
    [GETDATAMASTER]({commit, state}, {type}) {
        return new Promise((resolve) => {
            //get current page
            let page = `?page=`;
            switch (type) {
                case MAKAD:
                    page += state.akad.current_page;
                    break;
                case MJABATAN:
                    page += state.jabatan.current_page;
                    break;
                case MPEGAWAI:
                    page += state.pegawai.current_page;
                    break;
                case MPRODUK:
                    page += state.produk.current_page;
                    break;
                case MJENISTRANSAKSI:
                    page += state.jenistransaksi.current_page;
                    break;
            }
            ApiService.get(`${type}${page}`)
                .then(({success, data, shouldNext}) => {

                    if (success) {
                        if (shouldNext) {
                            commit(INCREMENT_PAGE, {type: type});
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                    data.map((item) => {
                        commit(ADDDATAMASTER, {
                            type: type,
                            data: item,
                        });
                    });
                })
        });
    },
    /***
     * send data to server
     * @param {type,path,body}
     * @returns save data to server the add to array store
     * @returns {success,message}
     *
     * @param type
     * @param body
     */
    [POSTDATAMASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.post(`${type}`, body)
                .then(({success, data, message}) => {
                    resolve({success: success, message: message});
                    if (success) {

                        commit(ADDDATAMASTER, {
                            type: type,
                            data: data[0],
                        });
                    }
                })
        });
    },
    /****
     * Put data master
     * @params {type,body}
     * update data to server the notify the data was changed
     * @returns
     */
    [PUTDATAMASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.put(`${type}/${body.id}`, body)
                .then(({success, data, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(EDITDATAMASTER, {
                            type: type,
                            data: data[0],
                            olddata: body,
                        });

                    }
                })
        });
    },
    /***
     * delete data
     * @param {type,path,body}
     * @returns delete data by id
     * @returns if success it will update data no need reload data from service
     * @param type
     * @param body
     */
    [DELETEDATAMASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.delete(`${type}/${body.id}`)
                .then(({success, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(REMOVEDATAMASTER, {
                            type: type,
                            data: body,
                        });
                    }
                })
        });
    },
};
const mutations = {
    /***
     * adding data to each state
     * @param {type,data,page}
     * @returns data will be add one -by one
     * @param state
     */
    [INCREMENT_PAGE](state, {type}) {
        switch (type) {
            case MAKAD:
                state.akad.current_page++;
                break;
            case MJABATAN:
                state.jabatan.current_page++;
                break;
            case MJENISTRANSAKSI:
                state.jenistransaksi.current_page++;
                break;
            case MPEGAWAI:
                state.pegawai.current_page++;
                break;
            case MPRODUK:
                state.produk.current_page++;
                break;
        }
    },
    [ADDDATAMASTER](state, {type, data}) {
        if (type === MAKAD) {

            const exist = state.dataakad.some((akad) => akad.id === data.id);
            if (!exist) {
                state.dataakad.push(data);
            }
        }
        if (type === MJABATAN) {
            const exist = state.datajabatan.some((jabatan) => jabatan.id === data.id);
            if (!exist) {
                state.datajabatan.push(data);
            }

        }
        if (type === MJENISTRANSAKSI) {
            // console.log(data);
            const exist = state.datajenistransaksi.some((jenis) => jenis.id === data.id);
            if (!exist) {
                state.datajenistransaksi.push(data);
            }
        }
        if (type === MPEGAWAI) {
            const exist = state.datapegawai.some((pegawai) => pegawai.id === data.id);
            if (!exist) {
                state.datapegawai.push(data);
            }
        }
        if (type === MPRODUK) {
            const exist = state.dataproduk.some((produk) => produk.id === data.id);
            if (!exist) {
                state.dataproduk.push(data);
            }
        }
    },
    /***
     * Update data
     * @params {state,type,data,olddata}
     * update item inside array state data
     * @returns change reactivly
     */
    [EDITDATAMASTER]
        (state, {type, data, olddata}) {

        if (type === MAKAD) {
            const index = state.dataakad.map((akad) => akad.id).indexOf(olddata.id);
            Object.assign(state.dataakad[index], data);
        }
        if (type === MJABATAN) {
            const index = state.datajabatan
                .map((jabatan) => jabatan.id)
                .indexOf(olddata.id);
            Object.assign(state.datajabatan[index], data);
        }
        if (type === MJENISTRANSAKSI) {
            console.log(type);
            const index = state.datajenistransaksi
                .map((jenis) => jenis.id)
                .indexOf(olddata.id);
            Object.assign(state.datajenistransaksi[index], data);
        }
        if (type === MPEGAWAI) {
            const index = state.datapegawai
                .map((pegawai) => pegawai.id)
                .indexOf(olddata.id);
            Object.assign(state.datapegawai[index], data);
        }
        if (type === MPRODUK) {
            const index = state.dataproduk
                .map((produk) => produk.id)
                .indexOf(olddata.id);
            Object.assign(state.dataproduk[index], data);
        }

    },
    /***
     * delete data y index
     * @params {state,type,data}
     * @return remove data by index
     */
    [REMOVEDATAMASTER](state, {type, data}) {
        if (type === MAKAD) {
            const index = state.dataakad.map((akad) => akad.id).indexOf(data.id);
            state.dataakad.splice(index,1);
        }
        if (type === MJABATAN) {
            const index = state.datajabatan
                .map((jabatan) => jabatan.id)
                .indexOf(data.id);
            state.datajabatan.splice(index,1);
        }
        if (type === MJENISTRANSAKSI) {
            const index = state.datajenistransaksi
                .map((jenis) => jenis.id)
                .indexOf(data.id);
            state.datajenistransaksi.splice(index,1);
        }
        if (type === MPEGAWAI) {
            const index = state.datapegawai
                .map((pegawai) => pegawai.id)
                .indexOf(data.id);
            state.datapegawai.splice(index,1);
        }
        if (type === MPRODUK) {
            const index = state.dataproduk
                .map((produk) => produk.id)
                .indexOf(data.id);
            state.dataproduk.splice(index,1);
        }

    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
