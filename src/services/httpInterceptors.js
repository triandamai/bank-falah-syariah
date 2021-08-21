/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 * catch every response
 * step intercept
 * 1. check status code
 *  1.2 check method(if method==GET check if the request should recursif because pagination)
 * 2. check if contains erros or just message
 * and should return
 * {
 *     "success":boolean,
 *     "data":any,
 *     "message":string,
 *     "shouldNext":boolean,
 * }
 * **/
import Vue from "vue"
import i81n from "@/plugins/i18n"
export const responseInterceptor=(response)=>{

    let shouldNext=false
    let message =""
    let data = []
    let success = false
    //check status code
    if(response.status === 200 || response.status === 201){
        success = true
        if(response.data.data.data) {
            data = response.data.data.data
            if(response.data.data.token){
                data.token = response.data.data.token
            }
        }else {
            data = response.data.data
            if(response.data.token){
                data.token = response.data.token
            }
        }

        if(response.config.method === "get" || response.config.method === "GET"){
            shouldNext = false
            message = "Success Get Data"
        }else {
            message = "Berhasil Proses"
            if(response.config.url === "login"){

                Vue.notify({
                    group:"bp",
                    title:i81n.t("SUCCESS"),
                    type:"success",
                    text:message
                })
            }else {

                Vue.notify({
                    group:"bp",
                    title:i81n.t("SUCCESS"),
                    type:"success",
                    text:message
                })
            }
        }

    }else {
        success = false
        data = []
    }

    //if all process didn't pass
    return {
        success:success,
        data:data,
        message:message,
        shouldNext:shouldNext
    }
}
/**
 * catch every error
 * **/
export const errorInterceptor=(error)=>{
  //  console.log("error",error.response)

    let message =""
    let data = []
    if(error.response.status === 500){
        message = i81n.t("HTTP_500")
        Vue.notify({
            group:"bp",
            title:i81n.t("ERROR"),
            type:"error",
            text:message
        })
    }
    if(error.response.status === 400){
        const errors = error.response.data.errors
        let fill =""
        const keys =  Object.keys(errors)
        keys.forEach(key=>{
            if(key){
                fill += `${key.replace("_"," ")},`
            }

        })
        message = i81n.t("HTTP_VALIDATION",{context:fill})
        Vue.notify({
            group:"bp",
            title:i81n.t("VALIDATION"),
            type:"error",
            text:message
        })
    }
    if(error.response.status === 401){
        message = i81n.t("HTTP_UNAUTHORIZED")
        Vue.notify({
            group:"bp",
            title:i81n.t("UNAUTHORIZED"),
            type:"error",
            text:message
        })
    }
    return Promise.resolve({
        success:false,
        data:data,
        message:message,
        shouldNext:false
    })
}