import {arrayData,expectResult,arrayNeraca,expectResultNeraca} from './arrayData'
import {extractBankTransaction} from '@/utils/TransactionBankExtractFromExcel'
import {extractNeracaTransaction} from '@/utils/TransactionNeracaExtractFromExcel'
describe('Populate data transaksi bank',()=>{
    it('should get array from file excel bank', function () {
        const finalResult = extractBankTransaction(arrayData())
        //final test
        expect(finalResult[0]).toStrictEqual(expectResult()[0])
    });

    it("should get array from file excel neraca",function () {
        const finalResult = extractNeracaTransaction(arrayNeraca())
      //  expect(finalResult[0]).toStrictEqual(expectResultNeraca()[0])
    })

})