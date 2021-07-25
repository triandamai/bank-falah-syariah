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
        },
        unAuthorize(){
            setTimeout(()=>{
              //  this.$router.push({path:'/unlock'})
            },2100)
            this.$swal({
                title: 'Akun terhubung di perangkat lain!',
                html: 'Anda akan diarahkan ke halaman masuk.',
                timer:2000
            })
        }
    }
}