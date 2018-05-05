"use strict";

// id: number, title: string, choice: string[], author: string
var VotingItem = function(item) {
    if (item) {
        var obj = JSON.parse(item);
        this.id = obj.id;
        this.title = obj.title;
        this.choice = obj.choice;
        this.author = obj.author;
    } else {
        this.title = '';
        this.choice = [];
        this.author = '';
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
        stringify: function (o) {
            return o.toString();
        },
    });
};

VotingManager.prototype = {
    init: function() {},

    enroll: function(title, choice) {
        if (title === '' || choice.length === 0) throw new Error("empty title or choice");
        if (title.length > 64) throw new Error("title exceed limit length");

        var id = this.votingItemRepo.get('MAXID') ? this.votingItemRepo.get('MAXID') + 1 : 1;
        var author = Blockchain.transaction.from;

        var votingItem = this.votingItemRepo.get(id);
        if (votingItem) throw new Error("Voting Item has been occupied");

        votingItem = new VotingItem();
        votingItem.id = id;
        votingItem.author = author;
        votingItem.title = title;
        votingItem.choice = choice;
        this.votingItemRepo.put('MAXID', votingItem.id);
        this.votingItemRepo.put(id, votingItem);
        return votingItem;
    },

    get: function(id) {
        if (id === undefined) throw new Error("id is invalid")
        var votingItem = this.votingItemRepo.get(id);
        if (votingItem === undefined) throw new Error("votingItem is not existed")
        return votingItem;
    },
};

module.exports = VotingManager;
