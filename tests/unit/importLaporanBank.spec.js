import {arrayData} from './arrayData'
describe('Populate data laporan bank',()=>{
    it('should populateData', function () {
        let finalResult =[]
        const removeNoData = arrayData()
            .filter((val)=>val['POS'] !== '-' && val['POS'] !== '' && val['POS'] !== '+')
        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
        const getGroupingData =
            removeNoData
            .map((data,index)=>{
                let availableTransaction = data['POS']
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
                    first:{
                        nama_transaksi : data['POS'],
                        nominal : firstData,
                        waktu_masuk: getFiltered[0],
                        type_waktu_masuk: 'tahun',
                        detail_transaksi:[],
                        type:data['TYPE']
                    },
                    second:{
                        nama_transaksi : data['POS'],
                        nominal : secondData,
                        waktu_masuk: getFiltered[1],
                        type_waktu_masuk: 'tahun',
                        detail_transaksi:[],
                        type:data['TYPE']
                    }
                }
            }
            return null
        }).filter((val)=>val!==null)

        getGroupingData
            .map((parent,index)=>{
                    if(index < getGroupingData.length){
                        let indexNextParentData = getGroupingData[index+1]

                        if(indexNextParentData !== undefined){
                            for (let i=parent.index; i < indexNextParentData.index;i++){
                                let getSubData = removeNoData[i]

                                if(getSubData['POS'] !== parent.nama_transaksi) {
                                    parent.first.detail_transaksi.push({
                                        nama_transaksi: getSubData['POS'],
                                        nominal: getSubData[parent.first.waktu_masuk]
                                    })
                                    parent.second.detail_transaksi.push({
                                        nama_transaksi: getSubData['POS'],
                                        nominal: getSubData[parent.second.waktu_masuk]
                                    })
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


        expect(finalResult).toBeInstanceOf(Array)
    });

})