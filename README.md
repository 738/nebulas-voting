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
function enroll(title, choices, author, password, isMultipleSelection);
```
* enroll a voting
* id is created automatically from 1 sequentially

### Parameter Values
|Argument|Type  |Description|
|--------|------|-----------|
|title   |string|the title of voting|
|choices |string|choices of voting(seperated by "\|")|
|author  |string|author of voting(if there is no author parameter, author value is filled by the author's address)|
|isMultipleSelection|boolean|if it is true, voter can vote one more choices. default value is false|

### Syntax
```
function get(id, password, returnFunc, fromGetVotingList);
```
* get a voting by id

### Syntax
```
function getVotingList();
```
* get all list of votings

### Syntax
```
function vote(id, index, password);
```
* can not vote twice or more by one address

### Parameter Values
|Argument|Type  |Description|
|--------|------|-----------|
|id      |number|the id of voting|
|index   |string|the index of choices of the voting. if selection is more than one, this value should be seperated by "\|"|
