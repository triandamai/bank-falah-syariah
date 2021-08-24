/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */

import ApiService from "@/services/api.service";
import router from "@/router";
import Vue from "vue";

const GET_DATA_SYSTEM = "GETDATASYSTEM";
const POST_DATA_SYSTEM = "POGETDATASYSTEM";
const PUT_DATA_SYSTEM = "PUGETDATASYSTEM";
const DELETE_DATA_SYSTEM = "DELETEDATASYSTEM";
const POST_IMPORT_USER = "IMPORT_USER"
export const ACTION_GET_DATA_SYSTEM = `system/${GET_DATA_SYSTEM}`;
export const ACTION_POST_DATA_SYSTEM = `system/${POST_DATA_SYSTEM}`;
export const ACTION_PUT_DATA_SYSTEM = `system/${PUT_DATA_SYSTEM}`;
export const ACTION_DELETE_DATA_SYSTEM = `system/${DELETE_DATA_SYSTEM}`;
export const ACTION_IMPORT_USER = `system/${POST_IMPORT_USER}`

const ADD_DATA_SYSTEM = "MADDDATASYSTEM";
const EDIT_DATA_SYSTEM = "MPUTDATASYSTEM";
const REMOVE_DATA_SYSTEM = "MDDATASYSTEM";
const INCREMENT_PAGE = `INCREMENT`;
export const MUTATION_ADD_DATA_SYSTEM = `system/${ADD_DATA_SYSTEM}`;
export const MUTATION_PUT_DATA_SYSTEM = `system/${EDIT_DATA_SYSTEM}`;
export const MUTATION_DELETE_DATA_SYSTEM = `system/${REMOVE_DATA_SYSTEM}`;

export const SUSER = "users";
export const SROLE = "roles";
export const SGROUP = "groups";

const state = {
    datausers: [],
    user: {
        current_page: 1,
        last_page: 0,
    },
    datagroups: [],
    group: {
        current_page: 1,
        last_page: 0,
        dialog: false,
    },
    dataroles: [],
    role: {
        current_page: 1,
        last_page: 0,
        dialog: false,
    },
};

const actions = {
    /***
     * get data
     * @params {type,path,id}
     * @todo
     * @returns promise true/false if true get data always repeat until last_page
     */
    [GET_DATA_SYSTEM]({commit, state}, {type}) {
        return new Promise((resolve) => {
            //get pagination
            let page = `?page=`;
            //proper way to get pagination t service maybe :-)
            switch (type) {
                case SGROUP:
                    page += state.group.current_page;
                    break;
                case SUSER:
                    page += state.user.current_page;
                    break;
                case SROLE:
                    page += state.role.current_page;
                    break;
            }

            ApiService.get(`${type}${page}`)
                .then(({shouldNext, data}) => {
                       resolve(shouldNext);
                        data.map((item) => {
                            commit(ADD_DATA_SYSTEM, {
                                type: type,
                                data: item,
                            });
                        });

                })

        });
    },
    [POST_IMPORT_USER]({commit, state}, {data}) {
        return new Promise((resolve) => {
            ApiService.post(`user/siswa/import`, {siswa: data})
                .then(({success,message, data}) => {
                    resolve({success: success, message: message})
                if (success) {

                    data.map(siswa => {
                        commit(ADD_DATA_SYSTEM, {type: SUSER, data: siswa})
                    })

                }
            })
        })
    },
    /***
     * Send User and save
     * @return boolean is saved? then commit to datauser
     * @returns {success,message}
     * @param commit
     * @param type
     * @param body
     */
    [POST_DATA_SYSTEM]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.post(`${type === SUSER ? 'user' : type === SROLE ? 'role' : 'group'}`, body)
                .then(({success,message, data}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(ADD_DATA_SYSTEM, {
                            type: type,
                            data: data[0],
                        });
                    }
                })
        });
    },
    /***
     * Edit User
     * !password cannot be null(but in this case update only few form)
     * !not finish yet
     * @return  promise update data user then commit to mutation
     * @returns {success,message}
     * @param commit
     * @param type
     * @param body
     */
    [PUT_DATA_SYSTEM]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.put(`${type === SUSER ? 'user' : type === SROLE ? 'role' : 'group'}/${body.id}`, body)
                .then(({success,message, data}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(EDIT_DATA_SYSTEM, {
                            type: type,
                            data:data[0],
                            olddata: body,
                        });

                    }
                })
        });
    },
    /***
     * delete data
     * @param {type,path,body}
     * @return boolean is saved? then commit remove user from data user by index
     * @param type
     * @param body
     */
    [DELETE_DATA_SYSTEM]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.delete(`${type === SUSER ? 'user' : type === SROLE ? 'role' : 'group'}/${body.id}`)
                .then(({success, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(REMOVE_DATA_SYSTEM, {
                            type: type,
                            data: body,
                        });

                    }
                })
        });
    },
};
const mutations = {
    [INCREMENT_PAGE](state, {type}) {
        switch (type) {
            case SUSER:
                state.user.current_page++;
                break;
            case SROLE:
                state.role.current_page++;
                break;
            case SGROUP:
                state.group.current_page++;
                break;
        }
    },
    /***
     * Add data
     * @param {type,data}
     * @return data user add one by one
     * @todo if exist and data change sholud update
     * @param state
     */
    [ADD_DATA_SYSTEM](state, {type, data}) {
        if(type === SUSER) {
            const exist = state.datausers.some((user) => user.id === data.id);
            if (!exist) {
                state.datausers.push(data);
            }
        }
        if(type === SROLE) {
            const exist = state.dataroles.some((role) => role.id === data.id);
            if (!exist) {
                state.dataroles.push(data);
            }
        }
        if(type === SGROUP) {
            const exist = state.datagroups.some((group) => group.id === data.id);
            if (!exist) {
                state.datagroups.push(data);
            }
        }

    },
    /***
     * add updated data to existing data
     *@param {type,data,olddata}
     * @param state
     */
    [EDIT_DATA_SYSTEM](state, {type, data, olddata}) {
    if(type === SUSER) {
        const index = state.datausers.map((user) => user.id).indexOf(olddata.id);
        Object.assign(state.datausers[index], data);
    }
    if(type === SGROUP) {
        const index = state.datagroups
            .map((group) => group.id)
            .indexOf(olddata.id);
        Object.assign(state.datagroups[index], data);
    }
    if(type === SROLE) {
        const index = state.dataroles.map((role) => role.id).indexOf(olddata.id);
        Object.assign(state.dataroles[index], data);
    }

    },

    /***
     * delete data y index
     * @param {type,data}
     * @return remove user by index
     * @param state
     */
    [REMOVE_DATA_SYSTEM](state, {type, data}) {
        if(type === SUSER) {
            const index = state.datausers.map((user) => user.id).indexOf(data.id);
            state.datausers.splice(index,1);
        }
        if(type === SGROUP) {
            const index = state.datagroups.map((group) => group.id).indexOf(data.id);
            state.datagroups.splice(index,1);
        }
        if(type === SROLE) {
            const index = state.dataroles.map((role) => role.id).indexOf(data.id);
            state.dataroles.splice(index,1);
        }

    },
};

export default {namespaced: true, state, actions, mutations};
