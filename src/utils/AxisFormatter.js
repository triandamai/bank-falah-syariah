/**
 * Confirguration for chart
 * Created By Trian Damai
 * https://github.com/triandamai
 * Created At 12/12/21 23.28
 */

var primary = localStorage.getItem("primary_color") || "#7366ff";
var secondary = localStorage.getItem("secondary_color") || "#f73164";

export const getOptions =(label,max) =>{
    return {

        xaxis: {
            type: "datetime",
                low: 0,
                offsetX: 0,
                offsetY: 0,
                show: true,
                categories: label,
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
                max:max+2,
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
    }
}

export const getSeries=()=>{

}

export const defaultOptions =  {
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
}