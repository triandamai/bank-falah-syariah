import {LOGIN} from "@/store";
import {getCurrendUsername} from "@/services/jwt.service";

export default {
    data() {
        return {
            overlay:false,
            type: "password",
            email: "",
            password: "",
            submitted: false,
            disable: false,
        };
    },
    methods: {
        // show/hide password
        showPassword: function() {
            if (this.type === "password") {
                this.type = "text";
            } else {
                this.type = "password";
            }
        },
        // Firebase login
        signUp: function() {
            this.submitted = true;
            if (this.email !== "" && this.password !== "") {
                this.authenticate(this.email,this.password)
            }else {
                this.$toasted.show(
                    this.$t("Failed Message",
                        { context: `Username dan Password tidak boleh kosong!`}),
                    {
                        theme: "bubble",
                        position: "top-right",
                        type: "warning",
                        duration: 2000,
                    }
                )
            }
        },
        unLock(){
            if(this.password !== ""){

                this.authenticate(getCurrendUsername(),this.password)
            }else {
                this.$toasted.show(
                    this.$t("Failed Message",
                        { context: `Password tidak boleh kosong!`}),
                    {
                        theme: "bubble",
                        position: "top-right",
                        type: "warning",
                        duration: 2000,
                    }
                )
            }
        },

        authenticate(username,password){
            this.disable = true;
            this.overlay = true;
            this.$store
                .dispatch(`auth/${LOGIN}`, {
                    username: username,
                    password: password,
                })
                .then(({ success, message }) => {
                    this.$toasted.show(
                        success
                            ? this.$t("Success Message", { context: `${message}` })
                            : this.$t("Failed Message", { context: `${message}` }),
                        {
                            theme: "bubble",
                            position: "top-right",
                            type: success ? "success" : "error",
                            duration: 2000,
                        }
                    );
                    this.overlay = false;
                    if (success) {

                        setTimeout(() => {
                            this.$router.replace({ path: "/" }).catch(e=>{
                                console.log(e)
                            });
                        }, 1000);

                    }
                    this.disable = false;

                });
        }
    },
}