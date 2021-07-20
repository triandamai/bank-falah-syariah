import {mapState} from "vuex";

export  default {
    props: ["show", "body"],
    data:()=>{return{
        tipe_produk: [
            { val: "1", text: "Simpanan" },
            { val: "2", text: "Pembiayaan" },
            { val: "3", text: "Deposito" },
        ],
        tipe_angsuran: [
            { val: "1", text: "Mingguan" },
            { val: "2", text: "harian" },
        ],
    }},
    watch: {
        body: function(newVal) {
            this.form = newVal;
        },
    },
    computed: {
        ...mapState({
            itemsjabatan: (state) => state.master.datajabatan,
            itemsproduk: (state) => state.master.dataproduk,
            itemsnasabah: (state) => state.nasabah.datanasabah,
            itemspegawai: (state) => state.master.datapegawai,
        }),
    },
    methods:{
        close(val=true){
          this.$emit( 'close', val)
        },
        submit(){
            this.$emit("submit",this.form);
        }
    }
}