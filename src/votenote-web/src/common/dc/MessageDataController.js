import { dappAddress } from '../../config';

export function postMessageToSmartContract(func, args, method) {
    window.postMessage({
        "target": "contentscript",
        "data": {
            "to": dappAddress,
            "value": "0",
            "contract": {
                "function": func,
                "args": args,
            }
        },
        "method": method,
    }, "*");
}