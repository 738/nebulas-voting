var Stubs = require('./contractStubs');
var VotingManager = require('./contract');

let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;

Blockchain.changeTransactionAfterGet = false;

let contract = new VotingManager();
contract.init();

contract.enroll("{\"title\": \"which is the best blockchain?\", \"author\": \"Jon Jee\", \"choices\": [\"BTC\", \"ETH \", \"NAS\"]}");
contract.vote(0, 1);
let votingManager = contract.get(0);

contract.enroll("{\"title\": \"which is the best blockchain?22\", \"author\": \"Jon Jee\", \"choices\": [\"BTC\", \"ETH \", \"NAS\"]}");
contract.vote(1, 2);
contract.likeOrUnlike(1);
contract.likeOrUnlike(1);
contract.likeOrUnlike(1);
contract.likeOrUnlike(0);
let votingManager2 = contract.get(1);

console.log(votingManager);
console.log(votingManager2);
console.log(contract.getVotingList());
contract.delete(0);
console.log(contract.getVotingList());
console.log(contract.get(0));