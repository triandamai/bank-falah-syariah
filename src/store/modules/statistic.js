/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@/services/api.service.js";

const STATISTIC = "STATISTIC"

export const ACTION_GET_STATISTIC = `statistic/${STATISTIC}`


var primary = localStorage.getItem("primary_color") || "#7366ff";
var secondary = localStorage.getItem("secondary_color") || "#f73164";
const state = {
    totalnasabah: 0,
    totaltransaksi: 0,
    options: {
        chart: {
            width: 685,
            height: 230,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        colors: [primary, secondary],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
            low: 0,
            offsetX: 0,
            offsetY: 0,
            show: false,
            categories: [],
            labels: {
                low: 0,
                offsetX: 0,
                show: false,
            },
            axisBorder: {
                low: 0,
                offsetX: 0,
                show: false,
            },
        },
        yaxis: {
            low: 0,
            offsetX: 0,
            offsetY: 0,
            show: false,
            max: 16,
            labels: {
                low: 0,
                offsetX: 0,
                show: false,
            },
            axisBorder: {
                low: 0,
                offsetX: 0,
                show: false,
            },
        },
        markers: {
            strokeWidth: 3,
            colors: "#ffffff",
            strokeColors: [primary, secondary],
            hover: {
                size: 6,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 80, 100],
            },
        },
        legend: {
            show: true,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy",
            },
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
                bottom: -15,
                top: -40,
            },
        },
    },
    series: []
};
const getters = {};
const actions = {
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    [STATISTIC]({commit, state}, {}) {
        return new Promise((resolve) => {
            ApiService.get("/statistics?days=10").then(({status, data}) => {

                if (status === 200 || status === 201) {
                    const data_nasabah = []
                    const data_transaksi = []
                    const data_label = []
                    let transaksi = 0;
                    let nasabah = 0;
                    let max = 0;
                    data.data.map(item => {
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
                        success: true,
                        data: {label: data_label, transaksi: data_transaksi, nasabah: data_nasabah, max: max}
                    });
                } else {
                    resolve({success: false, data: []});
                }
            }).catch(() => {
                resolve({
                    success: false,
                    message: "Terjadi kesalahan coba lagi nanti!",
                });
            })

        })
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern

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
