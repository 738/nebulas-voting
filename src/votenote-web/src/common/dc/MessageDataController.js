import Nebulas from 'nebulas';
import NebPay from 'nebpay.js';
import { dappAddress, networkAddress, ownerAddress } from '../../config';

export function callSmartContract(func, args, callback) {
    var Neb = Nebulas.Neb;
    var neb = new Neb();
    neb.setRequest(new Nebulas.HttpRequest(networkAddress));

    neb.api.call({
        chainID: 1,
        from: ownerAddress,
        to: dappAddress,
        value: 0,
        gasPrice: 1000000,
        gasLimit: 2000000,
        contract: {
            function: func,
            args: args
        }
    }).then(tx => {
        callback(tx);
    });
}

export function sendTransaction(value, func, args, callbackListener) {
    var nebPay = new NebPay();
    var serialNumber;
    var callbackUrl = NebPay.config.mainnetUrl;
    // var callbackUrl = NebPay.config.testnetUrl;
    serialNumber = nebPay.call(dappAddress, value, func, args, {
        callback: callbackUrl,
        listener: callbackListener  //set listener for extension transaction result
    });
    setTimeout(() => {
        onrefreshClick();
    }, 1000);
    function onrefreshClick() {
        nebPay.queryPayInfo(serialNumber, { callback: callbackUrl })   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
                console.log(resp);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
