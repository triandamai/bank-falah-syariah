import {mapState} from "vuex";
import {formatCurrency} from "@/utils/utils";

export default {
    props: ["show", "body","edit"],
    data: () => {
        return {
            loading: false,
            dialog: false,
            files: null,
            rasio_nasabah: null,
            rasio_bank: null,
            modal_tgl_buka: false,
            modal_tgl_pencairan: false,
            modal_tgl_jatuh_tempo: false,
            options: {
                locale: "id-ID",
                prefix: "Rp",
                suffix: "",
                length: 11,
                precision: 1
            },
            nama_akad:[
                {value:"Mudharobah",name:"Mudharobah"},
                {value:"Musyarokah",name:"Musyarokah"},
                {value:"Wadi'ah",name:"Wadi'ah"},
                {value:"Murabahah",name:"Murabahah"}
            ],
            tipe_produk: [
                {val: 1, text: "Simpanan"},
                {val: 2, text: "Pembiayaan"},
                {val: 3, text: "Deposito"},
            ],
            tipe_angsuran: [
                {val: 1, text: "Mingguan"},
                {val: 2, text: "Harian"},
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
            if(newVal.rasio_nasabah || newVal.rasio_bank){
                this.rasio_bank = newVal.rasio_bank
                this.rasio_nasabah = newVal.rasio_nasabah
            }

        },
        rasio_nasabah: function(newVal) {
            this.form.rasio_bank = 100 - newVal;
            this.rasio_bank = 100 - newVal;
            this.form.rasio_nasabah = newVal;
        },
        rasio_bank: function(newVal) {
            this.form.rasio_nasabah = 100 - newVal;
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

        },
        ExcelDateToJSDate(serial, todate) {
            var utc_days = Math.floor(serial - 25569);
            var utc_value = utc_days * 86400;
            var date_info = new Date(utc_value * 1000);

            var fractional_day = serial - Math.floor(serial) + 0.0000001;

            var total_seconds = Math.floor(86400 * fractional_day);

            var seconds = total_seconds % 60;

            total_seconds -= seconds;

            var hours = Math.floor(total_seconds / (60 * 60));
            var minutes = Math.floor(total_seconds / 60) % 60;
            if (todate)
                return new Date(
                    date_info.getFullYear(),
                    date_info.getMonth(),
                    date_info.getDate(),
                    hours,
                    minutes,
                    seconds
                );
            return `${date_info.getUTCFullYear()}-${date_info.getMonth()}-${date_info.getDate()}`;
        },
        checkIDType(value) {
            if (value === "KTP") return 1;
            if (value === "SIM") return 2;
            if (value === "PASSPOSRT") return 3;
            return 1;
        },
        checkAgama(value) {
            if (value === "Islam") return 1;
            if (value === "Kristen") return 2;
            if (value === "Kristen Katolik") return 2;
            if (value === "Katolik") return 2;
            if (value === "Kristen Protestan") return 3;
            if (value === "Protestan") return 3;
            if (value === "Hindu") return 4;
            if (value === "Budha") return 5;
            if (value === "Konghucu") return 6;

            return 1;
        },
        checkEducation(value) {
            if (value === "SD") return 1;
            if (value === "SLTP/SMP/Sederajat") return 2;
            if (value === "SLTP") return 2;
            if (value === "SMP") return 2;
            if (value === "SLTA/SMA/SMK/Sederajat") return 3;
            if (value === "SLTA") return 3;
            if (value === "SMA") return 3;
            if (value === "SMK") return 3;
            if (value === "Diploma") return 4;
            if (value === "S1") return 5;
            if (value === "S2") return 6;
            if (value === "S3") return 7;
            if (value === "Lainnya") return 8;
            return 8;
        },
        checkStatusMartial(value) {
            if (value === "Lajang") return 1;
            if (value === "Menikah") return 2;
            if (value === "Janda/Duda") return 3;
            if (value === "Duda/Janda") return 3;
            if (value === "Janda") return 3;
            if (value === "Duda") return 3;
            return 1;
        },
        checkWork(value) {
            if (value === "Pegawai Negeri(Guru)") return 1;
            if (value === "Pegawai Negeri(Non Guru)") return 2;
            if (value === "PNS") return 2;
            if (value === "TNI/POLRI") return 3;
            if (value === "TNI") return 3;
            if (value === "POLRI") return 3;
            if (value === "Karyawan Swasta") return 4;
            if (value === "Petani") return 5;
            if (value === "Nelayan") return 6;
            if (value === "Peternak") return 7;
            if (value === "Pengrajin") return 8;
            if (value === "Pedagang") return 9;
            if (value === "Pekerjaan Lainnya") return 10;
            return 10;
        },
    }
}