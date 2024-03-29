import {isNumeric} from "./utils"

/**
 * Extract from excel to array data
 * Created By Trian Damai
 * https://github.com/triandamai
 * Created At 07/12/21 20.38
 * @see test/importExcelForTransaction.spec.js
 * @see test/arrayData.js
 */
let finalResult =[]
let headerFirstData = ""
let headerSecondData = ""
const headerParent = "NO"
const headerSub = "SUB"
// eslint-disable-next-line no-unused-vars
const headerInnerSub = "KAT"
const headerDataName = "POS"

export const extractNeracaTransaction=(data)=>{

    const removeNoData = removeNullAndBlankData(data)
    const getParentData = getFirstData(removeNoData)
    const getSub = getParentData.map((data,index)=>{
        let subDatas = []
        let parenData = data

        if(index < getParentData.length){
            const nextParentData = getParentData[index+1]
            for (let i =parenData.index; i < getStopIndex(nextParentData,removeNoData); i++){

                const subData = removeNoData[i]
                const subDataExist = subData[headerSub]
                if(subDataExist){
                    subDatas.push({
                        index:i,
                        first:{
                            nama:subData[headerDataName],
                            waktu_masuk:headerFirstData,
                            saldo:subData[headerFirstData],
                            sub_neraca:[]
                        },
                        second:{
                            nama:subData[headerDataName],
                            waktu_masuk:headerSecondData,
                            saldo:subData[headerSecondData],
                            sub_neraca:[]
                        }
                    })
                }
            }
            //getting third sub data
            const getKatSub = subDatas.map((ketData,index)=>{
                let ketSubData = ketData
                if(index < subDatas.length){
                    const nextKat = subDatas[index+1]
                    for (let j = ketSubData.index+1; j < getStopIndex(nextKat,subDatas);j++){
                        let getKatData = removeNoData[j]

                        ketSubData.first.sub_neraca.push({
                            nama:getKatData[headerDataName],
                            saldo:getKatData[headerFirstData]
                        })
                        ketSubData.second.sub_neraca.push({
                            nama:getKatData[headerDataName],
                            saldo:getKatData[headerFirstData]
                        })
                    }

                }
                return ketSubData
            })
            getKatSub.forEach(ket=>{
                parenData.first.sub_neraca.push(ket.first)
                parenData.second.sub_neraca.push(ket.first)
            })
        }

        return parenData
    })

    //getting final result
    getSub.forEach(parent=>{
        finalResult.push(parent.first)
        finalResult.push(parent.second)
    })

    return finalResult
}

/**
 * if next index unfortunately null or we assume the sub is last but not the last data
 * example:
 * - parent data 0
 *   - sub data 1
 *      - sub sub data 1
 *      - sub sub data 2
 *   - sub data 2
 * - parent data 1
 *   - sub data 1
 *   - sub data 2
 *
 * when loop reach parent data 1 the next data will be null/undefined
 * so we will use current parent data index until the latest index data
 */
const getStopIndex=(nextData,subData)=>{
    if(nextData === undefined){
        return subData.index -1
    }
    return nextData.index
}

//removing null or empty data
const removeNullAndBlankData =(data)=> data.filter((val)=> {
            let header = val[headerDataName]
            return header !== '-' && header !== '' && header !== '+'
})

//getting first data
const getFirstData = (data)=>data
    .map((data,index)=>{
        const parentData = data[headerParent]// get only parent that exist in NO
        if(parentData){
            let keys = Object.keys(data) // its will become ['2020','2019','NO','POS','KAT','SUB']
            //getting only ['2020','2019']
            const filterKeys = keys.filter((val )=>{
                return isNumeric(val)
            })

            headerFirstData = filterKeys[0]
            headerSecondData = filterKeys[1]

            return{
                index : index,
                first:{
                    nama : data[headerDataName],
                    waktu_masuk: headerFirstData,
                    saldo: data[headerFirstData],
                    sub_neraca:[]
                },
                second:{
                    nama : data[headerDataName],
                    waktu_masuk: headerSecondData,
                    saldo: data[headerSecondData],
                    sub_neraca:[]
                }
            }

        }
    })
    .filter(val=>val != null)

//getting second data
