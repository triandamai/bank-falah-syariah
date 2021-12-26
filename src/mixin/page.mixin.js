/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import {formatCurrency} from "@/utils/utils"
import {decrypt, encrypt} from "@/services/jwt.service";
import {mapState} from "vuex";

export default {
    data:()=>{
        return{
        body: {},
        options: {
            locale: "id-ID",
            prefix: "Rp",
            suffix: "",
            length: 11,
            precision: 1
        },
        isEdit: false,
        form:false
    }
    },
    computed:{
        ...mapState({
            lazyLoad:(state)=> state.lazyLoad,
        })
    },
    methods:{
        startLoading(){
            this.$store.commit('setLazyLoad',true)
        },
        stopLoading(){
            this.$store.commit('setLazyLoad',false)
        },
        encrypt:(plain)=>encrypt(plain),
        getTypeTransaction:(type)=> {
           // if (type === 1) return `DEBET`
            //return `KREDIT`
            return type
        },
        decrypt:(plain)=>decrypt(plain),
        formatCurrency:(total)=>formatCurrency(total),
        getMonthString(){
           const date = new Date();
           return date.toLocaleString('id-ID',{month:'long'});
        },
        getDateMutasi() {
            const date = new Date()
            return `${date.getDate()}, ${date.getFullYear()}`
        },
        getTodayDateMutasi(){
            const  date = new Date()
            return `${date.getDate()}, ${date.getFullYear()}`
        },
        formatReadableDate(param){
            const date = new Date(param);
            return `${date.toLocaleString("id-ID")}`
        },
        downloadFile(file,fileName){
            const createDownloadElement = document.createElement("a")
            createDownloadElement.href = file
            createDownloadElement.setAttribute("download",fileName)
            document.body.appendChild(createDownloadElement)
            createDownloadElement.click()
        }

    }
}