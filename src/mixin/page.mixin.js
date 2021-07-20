import {formatCurrency} from "@/utils/utils"

export default {
    methods:{
        formatCurrency:(total)=>formatCurrency(total),
        getMonthString(){
           const date = new Date();
           return date.toLocaleString('id-ID',{month:'long'});
        },
        getDateMutasi(){
            const  date = new Date()
            return `${date.getDate()}, ${date.getFullYear()}`
        },
        convertReadableDate(param){
            const date = new Date(param);
            return `${date.toLocaleString("id-ID")}`
        }
    }
}