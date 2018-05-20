var Stubs = require("./contractStubs");
let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;
let TestMap = Stubs.TestMap;

// id: number, title: string, choice: Array<[string, Array<string>]>, author: string, address: string, isMS: boolen, timestamp: number
class VotingItem {
    constructor(str) {
        let obj = str ? JSON.parse(str) : {};
        this.id = obj.id || 0;
        this.title = obj.title || '';
        this.author = obj.author || '';
        this.address = obj.address || '';
        this.choices = obj.choices || [];
        this.isMS = obj.isMS || false;         // isMultipleSelection
        this.timestamp = new Date().getTime();
    }

    toString() {
        return JSON.stringify(this);
    }
}

class VotingManager {
    constructor() {
        LocalContractStorage.defineProperty(this, "votingItemCount");
        LocalContractStorage.defineMapProperty(this, "votingItems", {
            parse: function (str) {
                return new VotingItem(str);
            },
            stringify: function (obj) {
                return obj.toString();
            }
        });
    }

    init() {
        this.votingItemCount = 0;
    }
    // title, author, choices, isMS = false
    enroll(votingItem) {
        let votingItemParsed = JSON.parse(votingItem);
        let { title, author, choices, isMS = false } = votingItemParsed;
        if (title === '') throw new Error("Argument Invalid: empty title");
        if (author === '') throw new Error("Argument Invalid: empty author");
        if (choices.length === 0) throw new Error("Argument Invalid: empty choices");

        var newVotingItem = new VotingItem();
        newVotingItem.id = this.votingItemCount;
        newVotingItem.title = title;
        newVotingItem.author = author;
        newVotingItem.address = Blockchain.transaction.from;
        newVotingItem.isMS = false;
        newVotingItem.timestamp = new Date().getTime();

        // save as [['AAA', []], ['BBB', []], ['CCC', []]] format
        var choicesWithVoter = [];
        for (var choice of choices) choicesWithVoter.push([choice, []]);
        newVotingItem.choices = choicesWithVoter;

        this.votingItems.set(this.votingItemCount, newVotingItem);
        this.votingItemCount++;

        return newVotingItem;
    }

    get(id) {
        if(id >= this.votingItemCount) throw new Error(`there is no votingItem in id: ${id}`);
        var votingItem = this.votingItems.get(id);
        return votingItem;
    }
}

module.exports = VotingManager;


    // getVotingList: function () {
    //     var id = LocalContractStorage.get(maxId);
    //     var votingLists = [];
    //     if (!id) return { votingLists, func: "getVotingList" };
    //     for (var i = 1; i <= id; i++) {
    //         var votingItem = this.get(i, undefined, false, true);
    //         if (votingItem !== undefined) votingLists.push(votingItem);
    //     }
    //     return { votingLists, func: "getVotingList" };
    // },

    // vote: function (id, index, password) {
    //     var votingItem = this.get(id, password, false);
    //     var voterAddress = Blockchain.transaction.from;
    //     var indexes = index.split('|').map(value => Number(value));
    //     // 한 사람이 같은 투표에 여러 번 투표할 수 없음
    //     for (var i = 0; i < votingItem.choices.length; i++)
    //         for (var j = 0; j < votingItem.choices[i][1].length; j++) {
    //             if (voterAddress === votingItem.choices[i][1][j]) return { result_code: 1, result_message: "cannot vote several times", func: "vote" };
    //         }
    //     if (!votingItem.isMultipleSelection) {
    //         if (indexes.length > 1) return { result_code: 1, result_message: "cannot select several" };
    //         if (votingItem.choices.length <= indexes[0]) return { result_code: 1, result_message: "There is no voting choice in that index", func: "vote" };
    //         votingItem.choices[index][1].push(voterAddress);
    //     }
    //     // Multiple Selection
    //     else {
    //         var indexes = index.split('|').map(value => Number(value));
    //         indexes.forEach(value => {
    //             if (value >= votingItem.choices.length) return { result_code: 1, result_message: "There is no voting choice in that index", func: "vote" };
    //         });
    //         indexes.forEach(value => {
    //             votingItem.choices[value][1].push(voterAddress);
    //         });
    //     }
    //     this.votingItemRepo.put(id, votingItem);
    //     return { votingItem, func: "vote" };
    // },

    // delete: function(id, password) {
    //     var votingItem = this.votingItemRepo.get(id, password, false);
    //     if (!votingItem) return { result_code: 1, result_message: 'id is invalid', func: 'delete' };
    //     if (Blockchain.transaction.from !== votingItem.address) return { result_code: 1, result_message: 'you are not author of this voting', func: 'delete' };
    //     this.votingItemRepo.del(id);
    //     if (this.votingItemRepo.get(id, password, false)) return { result_code: 1, result_message: 'delete failed', func: 'delete'};
    //     return { result_code: 0, result_message: 'delete succeed', func: 'delete'};
    // }

