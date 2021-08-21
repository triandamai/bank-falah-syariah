/**
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
const defaultResponse = {
    success:false,
    data:[],
    message:"",
    shouldNext:false
}
export const responseInterceptor=(response)=>{
  //  console.log("response",response)
    let shouldNext=false
    let message =""
    let data = []
    let success = false
    //check status code
    if(response.status === 200 || response.status === 201){
        if(response.config.method === "get" || response.config.method === "GET"){
            shouldNext = false
            message = "Success Get Data"
        }
        success = true
        if(response.data.data.data) {
            data = response.data.data.data
        }else {
            data = response.data.data
        }
    }

    if(response.status === 400){
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

    return Promise.resolve(defaultResponse)
}