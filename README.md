# VoteNote

> Voting Platform on Blockchain

* Blockchain Powered by Nebulas
* developed by Jon Jee

## How to use
1. enter https://votenote.herokuapp.com/

2. you can see voting lists and enroll button.

- if loading scene lasts more than 5 seconds, you should install [WebExtensionWallet](https://github.com/ChengOrangeJu/WebExtensionWallet) or set the network as Testnet.

3. click enroll button.

- fill title, author, choices (at most 5).

- if you click submit button, wallet popup will be appeared. click confirm button.

4. 15 seconds later, you can see your voting in voting list.

5. click the title of your voting, you can vote them once.

## Feature

### Syntax
```
function enroll(title, choices, author);
```
* enroll a voting
* id is created automatically from 1 sequentially

### Parameter Values
|Argument|Description|
|--------|-----------|
|title   |the title of voting|
|choices |choices of voting(seperated by "\|")|
|author  |author of voting(if there is no author parameter, author value is filled by the author's address)|

### Syntax
```
function get(id);
```
* get a voting by id

### Syntax
```
function getVotingList();
```
* get all list of votings

### Syntax
```
function vote(id, index);
```
* can not vote twice or more by one address

### Parameter Values
|Argument|Description|
|--------|-----------|
|id      |the id of voting|
|index   |the index of choices of the voting|
