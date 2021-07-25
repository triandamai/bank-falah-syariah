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
    created() {
        window.addEventListener("keydown", (e) => {
            //if Enter go to next
            if (e.key === "Enter") {
                if(this.show){
                    this.onSubmit()
                }
            }
        });
    },
    computed: {
        ...mapState({
            itemsjabatan: (state) => state.master.datajabatan,
            itemsproduk: (state) => state.master.dataproduk,
            itemsnasabah: (state) => state.nasabah.datanasabah,
            itemspegawai: (state) => state.master.datapegawai,
            nasabah: (state)=> state.nasabah.datanasabah,
            menuItems: (state) => state.menu.data,
            layout: (state) => state.layout.layout,
            togglesidebar: (state) => state.menu.togglesidebar,
            tabunganformsetortunai:(state)=> state.tabunganformsetortunai,
            tabunganformsetornontunai:(state)=> state.tabunganformsetornontunai,
            tabunganformtariktunai:(state)=> state.tabunganformtariktunai,
            tabunganformtariknontunai:(state)=> state.tabunganformtariknontunai,
            pembiayaanformsetortunai:(state)=> state.pembiayaanformsetortunai,
            pembiayaanformsetornontunai:(state)=> state.pembiayaanformsetornontunai,
            pembiayaanformtariktunai:(state)=> state.pembiayaanformtariktunai,
            pembiayaanformtariknontunai:(state)=> state.pembiayaanformtariknontunai,
        }),
    },
    methods:{
        hidden() {
            this.$store.commit("hideForm", {});
        },
        close(val=true){
          this.$emit( 'close', val)
        },
        submit(){
            this.$emit("submit",this.form);
        },
        unAuthorize(){

        }
    }
}