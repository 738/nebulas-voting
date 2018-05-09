"use strict";

// id: number, title: string, choice: Array<[string, Array<string>]>, author: string, address: string
var VotingItem = function(item) {
    if (item) {
        var obj = JSON.parse(item);
        this.id = obj.id;
        this.title = obj.title;
        this.choices = obj.choices;
        this.author = obj.author;
        this.address = obj.address;
    } else {
        this.title = '';
        this.choices = [];
        this.author = '';
        this.address = '';
    }
};

VotingItem.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};

var VotingManager = function () {
    LocalContractStorage.defineMapProperty(this, "votingItemRepo", {
        parse: function (item) {
            return new VotingItem(item);
        },
        stringify: function (obj) {
            return obj.toString();
        },
    });
};
const maxId = 'MAXID';
VotingManager.prototype = {
    init: function() {},

    enroll: function(title, choices, author) {
        var choicesParsed = choices.split('|');
        if (title === '' || choices.length === 0) throw new Error("empty title or choices");
        if (title.length > 64) throw new Error("title exceed limit length");

        var id = LocalContractStorage.get(maxId) ? LocalContractStorage.get(maxId) + 1 : 1;

        var votingItem = this.votingItemRepo.get(id);
        if (votingItem) throw new Error("Voting Item has been occupied");

        var address = Blockchain.transaction.from;
        votingItem = new VotingItem();
        votingItem.id = id;
        votingItem.title = title;
        votingItem.author = author || address;
        votingItem.address = address;

        // [['AAA', []], ['BBB', []], ['CCC', []]] 형식으로 저장
        var choicesWithNumber = [];
        for(var choice of choicesParsed) choicesWithNumber.push([choice, []]);
        votingItem.choices = choicesWithNumber;

        LocalContractStorage.put(maxId, votingItem.id);
        this.votingItemRepo.put(id, votingItem);
        return { votingItem, func: "enroll" };
    },

    get: function(id, returnFunc = true) {
        if (id === undefined) throw new Error("id is invalid");
        var votingItem = this.votingItemRepo.get(id);
        if (returnFunc) return { votingItem, func: "get" };
        else return votingItem;
    },

    getVotingList: function() {
        var id = LocalContractStorage.get(maxId);
        var votingLists = [];
        if (!id) return { votingLists, func: "getVotingList" };
        for (var i = 1; i <= id; i++) {
            var votingItem = this.get(i, false);
            if (votingItem !== undefined) votingLists.push(votingItem);
        }
        return { votingLists, func: "getVotingList" };
    },

    vote: function(id, index) {
        var votingItem = this.get(id, false);
        if (votingItem.choices.length <= index) throw new Error("There is no voting choice in that index");
        var voterAddress = Blockchain.transaction.from;
        // 한 사람이 같은 투표에 여러 번 투표할 수 없음
        for(var i = 0; i < votingItem.choices.length; i++) {
            for(var j = 0; j < votingItem.choices[i][1].length; j++) {
                if (voterAddress === votingItem.choices[i][1][j]) return 'you can vote just once';
            }
        }
        votingItem.choices[index][1].push(Blockchain.transaction.from);
        this.votingItemRepo.put(id, votingItem);
        return { votingItem, func: "vote" };
    }
};

module.exports = VotingManager;
