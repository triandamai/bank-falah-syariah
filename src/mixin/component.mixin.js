import {mapState} from "vuex";
import {formatCurrency} from "@/utils/utils";

export default {
    props: ["show", "body","edit"],
    data: () => {
        return {
            options: {
                locale: "id-ID",
                prefix: "Rp",
                suffix: "",
                length: 11,
                precision: 2
            },
            tipe_produk: [
                {val: "1", text: "Simpanan"},
                {val: "2", text: "Pembiayaan"},
                {val: "3", text: "Deposito"},
            ],
            tipe_angsuran: [
                {val: "1", text: "Mingguan"},
                {val: "2", text: "harian"},
            ],
            jenis_kelamin: [
                { label: "Laki-Laki", value: "L" },
                { label: "Perempuan", value: "P" },
            ],
            jenis_identitas: [
                { label: "KTP", value: 1 },
                { label: "SIM", value: 2 },
                { label: "PASSPORT", value: 3 },
            ],
            agama: [
                { label: "Islam", value: 1 },
                { label: "Kristen Katolik", value: 2 },
                { label: "Kristen Protestan", value: 3 },
                { label: "Hindu", value: 4 },
                { label: "Budha", value: 5 },
                { label: "Konghucu", value: 6 },
            ],
            pendidikan: [
                { label: "SD", value: 1 },
                { label: "SLTP/SMP/Sederajat", value: 2 },
                { label: "SLTA/SMA/SMK/Sederajat", value: 3 },
                { label: "Diploma", value: 4 },
                { label: "S1", value: 5 },
                { label: "S2", value: 6 },
                { label: "S3", value: 7 },
                { label: "Lainnya", value: 8 },
            ],
            status_martial: [
                { label: "Lajang", value: 1 },
                { label: "Menikah", value: 2 },
                { label: "Janda/Duda", value: 3 },
            ],
            jenis_pekerjaan: [
                { label: "Pegawai Negeri(Guru)", value: 1 },
                { label: "Pegawai Negeri(Non Guru)", value: 2 },
                { label: "TNI/POLRI", value: 3 },
                { label: "Karyawan Swasta", value: 4 },
                { label: "Petani", value: 5 },
                { label: "Nelayan", value: 6 },
                { label: "Peternak", value: 7 },
                { label: "Pengrajin", value: 8 },
                { label: "Pedagang", value: 9 },
                { label: "Pekerjaan Lainnya", value: 10 },
            ],
        }
    },
    watch: {
        body: function (newVal) {
            this.form = newVal;
        },
        rasio_nasabah: function(newVal) {
            this.form.rasio_bank = 100 - newVal;
            this.rasio_bank = 100 - newVal;
            this.form.rasio_nasabah = newVal;
        },
        rasio_bank: function(newVal) {
            this.form.rasion_nasabah = 100 - newVal;
            this.rasio_nasabah = 100 - newVal;
            this.form.rasio_bank = newVal;
        },
    },
    created() {
        window.addEventListener("keydown", (e) => {
            //if Enter go to next
            if (e.key === "Enter") {

                if (this.show) {
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
            nasabah: (state) => state.nasabah.datanasabah,
            menuItems: (state) => state.menu.menu,
            layout: (state) => state.layout.layout,
            togglesidebar: (state) => state.menu.togglesidebar,
            tabunganformsetortunai: (state) => state.tabunganformsetortunai,
            tabunganformsetornontunai: (state) => state.tabunganformsetornontunai,
            tabunganformtariktunai: (state) => state.tabunganformtariktunai,
            tabunganformtariknontunai: (state) => state.tabunganformtariknontunai,
            pembiayaanformsetortunai: (state) => state.pembiayaanformsetortunai,
            pembiayaanformsetornontunai: (state) => state.pembiayaanformsetornontunai,
            pembiayaanformtariktunai: (state) => state.pembiayaanformtariktunai,
            pembiayaanformtariknontunai: (state) => state.pembiayaanformtariknontunai,
            provinsi: (state) => state.wilayah.provinsi.data,
            kabupaten: (state) => state.wilayah.kabupaten.data,
            kecamatan: (state) => state.wilayah.kecamatan.data,
            desa: (state) => state.wilayah.desa.data,
            itemsrole: (state) => state.system.dataroles,
        }),
    },
    methods: {
        formatCurrency: (total) => formatCurrency(total),
        getMonthString() {
            const date = new Date();
            return date.toLocaleString('id-ID', {month: 'long'});
        },
        getDateMutasi() {
            const date = new Date()
            return `${date.getDate()}, ${date.getFullYear()}`
        },
        convertReadableDate(param) {
            const date = new Date(param);
            return `${date.toLocaleString("id-ID")}`
        },
        hidden() {
            this.$store.commit("hideForm", {});
        },
        close(val = true) {
            this.$emit('close', val)
        },
        submit() {
            this.$emit("submit", this.form);
        },
        unAuthorize() {

        }
    }
}