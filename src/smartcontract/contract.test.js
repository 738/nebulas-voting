var Stubs = require('./contractStubs');
var VotingManager = require('./contract');

let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;

Blockchain.changeTransactionAfterGet = false;

let contract = new VotingManager();
contract.init();

contract.enroll("{\"title\": \"which is the best blockchain?\", \"author\": \"Jon Jee\", \"choices\": [\"BTC\", \"ETH \", \"NAS\"]}");
let votingManager = contract.get(0);

contract.enroll("{\"title\": \"which is the best blockchain?\", \"author\": \"Jon Jee\", \"choices\": [\"BTC\", \"ETH \", \"NAS\"]}");
let votingManager2 = contract.get(1);

console.log(votingManager);
console.log(votingManager2);