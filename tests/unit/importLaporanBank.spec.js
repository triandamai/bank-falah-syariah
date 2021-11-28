import {arrayData,expectResult} from './arrayData'
import {extractBankTransaction} from '@/utils/TransactionBankExtractFromExcel'
describe('Populate data transaksi bank',()=>{
    it('should get array from file excel', function () {
        const finalResult = extractBankTransaction(arrayData())
        //final test

        expect(finalResult[0]).toStrictEqual(expectResult()[0])
    });

})