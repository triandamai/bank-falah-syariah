/*
* Extract data from excel for transaction bank
* 28 Nov 2021
* */
export const extractBankTransaction=(data)=>{
    let finalResult =[]
    const removeNoData = data
        .filter((val)=>val['POS'] !== '-' && val['POS'] !== '' && val['POS'] !== '+')
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
    const getGroupingData = removeNoData
        .map((data,index)=>{
            let availableTransaction = data['NO'] // get only parent that exist in NO
            if(availableTransaction){
                let keys = Object.keys(data) // its will become ['2020','2019','NO','POS POS']
                //getting only ['2020','2019']
                const getFiltered = keys.filter((val)=>{
                    return isNumeric(val)
                })
                const firstData = data[getFiltered[0]]
                const secondData = data[getFiltered[1]]

                return {
                    index:index,
                    first:{nama_transaksi : data['POS'], nominal : firstData, waktu_masuk: getFiltered[0], type_waktu_masuk: 'tahun', detail_transaksi:[], type:data['TYPE']},
                    second:{nama_transaksi : data['POS'], nominal : secondData, waktu_masuk: getFiltered[1], type_waktu_masuk: 'tahun', detail_transaksi:[], type:data['TYPE']}
                }
            }
            return null
        }).filter((val)=>val!==null)

    getGroupingData
        .map((parent,index)=>{
            if(index < getGroupingData.length){
                let indexNextParentData = getGroupingData[index+1]

                if(indexNextParentData !== undefined){
                    for (let i=parent.index; i < indexNextParentData.index;i++) {

                        let getSubData = removeNoData[i]

                        if (getSubData["POS"] !== '-' && getSubData["POS"] !== '+' && getSubData["POS"] !== null && getSubData["POS"] !== undefined) {
                           // global.console.log(getSubData['POS'])
                            if (getSubData['POS'] !== parent.first.nama_transaksi) {

                                parent.first.detail_transaksi.push({
                                    nama_transaksi: getSubData['POS'],
                                    nominal: getSubData[parent.first.waktu_masuk]
                                })

                            }

                            if (getSubData['POS'] !== parent.second.nama_transaksi) {
                                parent.second.detail_transaksi.push({
                                    nama_transaksi: getSubData['POS'],
                                    nominal: getSubData[parent.second.waktu_masuk]
                                })
                            }
                        }
                    }
                    return parent
                }
                return null
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