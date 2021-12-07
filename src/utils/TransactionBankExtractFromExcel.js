
/**
 * Extract from excel to array data
 * Created By Trian Damai
 * https://github.com/triandamai
 * Created At 28/11/21 20.38
 * @see test/importExcelForTransaction.spec.js
 * @see test/arrayData.js
 */
import {isNumeric} from "./utils"
export const extractBankTransaction=(data)=>{
    let headerFirstData = ""
    let headerSecondData = ""
    //in sheet excel we get data become array object so we can get data base on header
    const headerParent = "NO"
    const headerDataName = "POS"
    const headerDataType = "TYPE"

    let finalResult =[]
    //filter remove null or blank in each row
    const removeNoData = data
        .filter((val)=> {
                let data = val[headerDataName]
               return  data !== '-' && data !== '' && data !== '+'
            }
        )

    //get sub data check the example
    const getGroupingData = removeNoData
        .map((data,index)=>{
            let availableTransaction = data[headerParent] // get only parent that exist in NO
            if(availableTransaction){
                let keys = Object.keys(data) // its will become ['2020','2019','NO','POS POS']
                //getting only ['2020','2019']
                const getFiltered = keys.filter((val)=>{
                    return isNumeric(val)
                })
                headerFirstData = data[getFiltered[0]]
                headerSecondData = data[getFiltered[1]]

                return {
                    index:index,
                    first:{nama_transaksi : data[headerDataName], nominal : headerFirstData, waktu_masuk: getFiltered[0], type_waktu_masuk: 'tahun', detail_transaksi:[], type:data[headerDataType].toUpperCase()},
                    second:{nama_transaksi : data[headerDataName], nominal : headerSecondData, waktu_masuk: getFiltered[1], type_waktu_masuk: 'tahun', detail_transaksi:[], type:data[headerDataType].toUpperCase()}
                }
            }
            return null
        }).filter((val)=>val!==null)

    //get child from sub data
    getGroupingData
        .map((parent,index)=>{
            //make sure we not get array index bound exception
            if(index < getGroupingData.length){
                //get next data because we should get data base on index from current data to next data
                let indexNextParentData = getGroupingData[index+1]

                /**
                * if next index unfortunately null or we assume the sub is last but not the last data
                * example:
                * - parent data 0
                *   - sub data 1
                *   - sub data 2
                * - parent data 1
                *   - sub data 1
                *   - sub data 2
                *
                * when loop reach parent data 1 the next data will be null/undefined
                * so we will use current parent data index until the latest index data
                */
                const untilIndex = ()=>{
                    if(indexNextParentData === undefined){
                        return getGroupingData.length -1
                    }
                    return indexNextParentData.index
                }

                for (let i=parent.index; i < untilIndex();i++) {
                        let getSubData = removeNoData[i]
                        let getNameData = getSubData[headerDataName]
                        if (getNameData !== '-' &&
                            getNameData !== '+' &&
                            getNameData !== null &&
                            getNameData !== undefined
                        ) {

                            if (getNameData !== parent.first.nama_transaksi) {

                                parent.first.detail_transaksi.push({
                                    nama_transaksi: getNameData,
                                    nominal: getSubData[parent.first.waktu_masuk]
                                })

                            }

                            if (getNameData !== parent.second.nama_transaksi) {
                                parent.second.detail_transaksi.push({
                                    nama_transaksi: getNameData,
                                    nominal: getSubData[parent.second.waktu_masuk]
                                })
                            }
                        }
                    }

                return parent
            }
            return null
        })
        .filter(val => val !== null)
        .forEach(data=>{
            finalResult.push(data.first)
            finalResult.push(data.second)
        })
    return finalResult
}