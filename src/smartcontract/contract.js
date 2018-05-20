var Stubs = require("./contractStubs");
let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;
let TestMap = Stubs.TestMap;

// id: number, title: string, choice: Array<[string, Array<string>]>, author: string, address: string, timestamp: number, like: string[]
class VotingItem {
    constructor(str) {
        let obj = str ? JSON.parse(str) : {};
        this.id = obj.id || 0;
        this.title = obj.title || '';
        this.author = obj.author || '';
        this.address = obj.address || '';
        this.choices = obj.choices || [];
        this.timestamp = obj.timestamp || 0;
        this.like = obj.like || [];
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
    // title, author, choices
    enroll(votingItem) {
        let votingItemParsed = JSON.parse(votingItem);
        let { title, author, choices } = votingItemParsed;
        if (title === '') throw new Error("Argument Invalid: empty title");
        if (author === '') throw new Error("Argument Invalid: empty author");
        if (choices.length === 0) throw new Error("Argument Invalid: empty choices");

        var newVotingItem = new VotingItem();
        newVotingItem.id = this.votingItemCount;
        newVotingItem.title = title;
        newVotingItem.author = author;
        newVotingItem.address = Blockchain.transaction.from;
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
        if (id >= this.votingItemCount) throw new Error(`there is no votingItem in id: ${id}`);
        var votingItem = this.votingItems.get(id);
        return votingItem;
    }

    getVotingList() {
        var votingLists = [];
        for (var i = 0; i < this.votingItemCount; i++) {
            var votingItem = this.get(i)
            if (votingItem !== undefined && votingItem !== null) votingLists.push(votingItem);
        }
        return votingLists;
    }

    vote(id, index) {
        var votingItem = this.get(id);
        var voterAddress = Blockchain.transaction.from;

        // One vote per One address
        for (var i = 0; i < votingItem.choices.length; i++)
            for (var j = 0; j < votingItem.choices[i][1].length; j++) {
                if (voterAddress === votingItem.choices[i][1][j]) throw new Error("You already voted!");
            }
        if (votingItem.choices.length <= index) throw new Error(`Argument Invalid: There is no choice in index: ${index}`);
        votingItem.choices[index][1].push(voterAddress);

        this.votingItems.put(id, votingItem);
        return votingItem;
    }

    delete(id) {
        var votingItem = this.votingItems.get(id);
        if (!votingItem) throw new Error(`Argument Invalid: There is no votingItem in id: ${id}`);
        if (Blockchain.transaction.from !== votingItem.address) throw new Error("You are not the author of this voting");
        this.votingItems.del(id);
        if (this.votingItems.get(id)) throw new Error("Delete Failed")
        return { code: 0, msg: 'delete succeed' };
    }

    likeOrUnlike(id) {
        var votingItem = this.votingItems.get(id);
        var voterAddress = Blockchain.transaction.from;
        if (!votingItem) throw new Error(`Argument Invalid: There is no votingItem in id: ${id}`);
        // unlike
        for (var i = 0; i < votingItem.like.length; i++)
            if (votingItem.like[i] === voterAddress) {
                votingItem.like.splice(i, 1);
                this.votingItems.set(id, votingItem);
                return votingItem;
            }
        // like
        votingItem.like.push(voterAddress);
        this.votingItems.set(id, votingItem);
        return votingItem;
    }
}

module.exports = VotingManager;
