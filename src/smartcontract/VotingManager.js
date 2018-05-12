"use strict";

// id: number, title: string, choice: Array<[string, Array<string>]>, author: string, address: string
var VotingItem = function (item) {
    if (item) {
        var obj = JSON.parse(item);
        this.id = obj.id;
        this.title = obj.title;
        this.choices = obj.choices;
        this.author = obj.author;
        this.address = obj.address;
        this.isMultipleSelection = obj.isMultipleSelection;
        this.timestamp = new Date().getTime();
        this.password = obj.password;
    } else {
        this.title = '';
        this.choices = [];
        this.author = '';
        this.address = '';
        this.isMultipleSelection = false;
        this.timestamp = new Date().getTime();
        this.password = '';
    }
};

VotingItem.prototype = {
    toString: function () {
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
    init: function () { },

    enroll: function (title, choices, author, password, isMultipleSelection = false) {
        var choicesParsed = choices.split('|');
        if (title === '' || choices.length === 0) return { result_code: 1, result_message: "empty title or choices", func: "enroll" };
        if (title.length > 64) return { result_code: 1, result_message: "title exceed limit length", func: "enroll" };

        var id = LocalContractStorage.get(maxId) ? LocalContractStorage.get(maxId) + 1 : 1;

        var votingItem = this.votingItemRepo.get(id);
        if (votingItem) return { result_code: 1, result_message: "Voting Item has been occupied", func: "enroll" };

        var address = Blockchain.transaction.from;
        votingItem = new VotingItem();
        votingItem.id = id;
        votingItem.title = title;
        votingItem.author = author || address;
        votingItem.address = address;
        votingItem.isMultipleSelection = isMultipleSelection;
        votingItem.timestamp = new Date().getTime();
        votingItem.password = password;

        // save as [['AAA', []], ['BBB', []], ['CCC', []]] format
        var choicesWithNumber = [];
        for (var choice of choicesParsed) choicesWithNumber.push([choice, []]);
        votingItem.choices = choicesWithNumber;

        LocalContractStorage.put(maxId, votingItem.id);
        this.votingItemRepo.put(id, votingItem);
        return { votingItem, func: "enroll" };
    },

    get: function (id, password, returnFunc = true, fromGetVotingList = false) {
        if (id === undefined) return { result_code: 1, result_message: "id is invalid", func: "get" };
        var votingItem = this.votingItemRepo.get(id);
        if (!votingItem) return undefined;
        if (fromGetVotingList) votingItem = { id: votingItem.id, title: votingItem.title, author: votingItem.author, timestamp: votingItem.timestamp };
        // if votingItem has password, you need password to get this votingItem.
        if (votingItem.password && votingItem.password !== password) return { result_code: 1, result_message: 'password is incorrect', func: "get"};
        if (returnFunc) return { votingItem, func: "get" };
        else return votingItem;
    },

    getVotingList: function () {
        var id = LocalContractStorage.get(maxId);
        var votingLists = [];
        if (!id) return { votingLists, func: "getVotingList" };
        for (var i = 1; i <= id; i++) {
            var votingItem = this.get(i, undefined, false, true);
            if (votingItem !== undefined) votingLists.push(votingItem);
        }
        return { votingLists, func: "getVotingList" };
    },

    vote: function (id, index, password) {
        var votingItem = this.get(id, password, false);
        var voterAddress = Blockchain.transaction.from;
        var indexes = index.split('|').map(value => Number(value));
        // 한 사람이 같은 투표에 여러 번 투표할 수 없음
        for (var i = 0; i < votingItem.choices.length; i++)
            for (var j = 0; j < votingItem.choices[i][1].length; j++) {
                if (voterAddress === votingItem.choices[i][1][j]) return { result_code: 1, result_message: "cannot vote several times", func: "vote" };
            }
        if (!votingItem.isMultipleSelection) {
            if (indexes.length > 1) return { result_code: 1, result_message: "cannot select several" };
            if (votingItem.choices.length <= indexes[0]) return { result_code: 1, result_message: "There is no voting choice in that index", func: "vote" };
            votingItem.choices[index][1].push(voterAddress);
        }
        // Multiple Selection
        else {
            var indexes = index.split('|').map(value => Number(value));
            indexes.forEach(value => {
                if (value >= votingItem.choices.length) return { result_code: 1, result_message: "There is no voting choice in that index", func: "vote" };
            });
            indexes.forEach(value => {
                votingItem.choices[value][1].push(voterAddress);
            });
        }
        this.votingItemRepo.put(id, votingItem);
        return { votingItem, func: "vote" };
    },

    delete: function(id, password) {
        var votingItem = this.votingItemRepo.get(id, password, false);
        if (!votingItem) return { result_code: 1, result_message: 'id is invalid', func: 'delete' };
        if (Blockchain.transaction.from !== votingItem.address) return { result_code: 1, result_message: 'you are not author of this voting', func: 'delete' };
        this.votingItemRepo.del(id);
        if (this.votingItemRepo.get(id, password, false)) return { result_code: 1, result_message: 'delete failed', func: 'delete'};
        return { result_code: 0, result_message: 'delete succeed', func: 'delete'};
    }
};

module.exports = VotingManager;
