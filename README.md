# Votestagram

> Voting Platform on Blockchain

* Blockchain Powered by Nebulas
* developed by Jon Jee

![votinglistview](https://github.com/JonJee/nebulas-voting/blob/master/docs/img/capture_votinglistview.png)

![voteview](https://github.com/JonJee/nebulas-voting/blob/master/docs/img/capture_voteview.png)

![votingresult](https://github.com/JonJee/nebulas-voting/blob/master/docs/img/capture_votingresult.png)
## How to use
1. enter https://vote.nasd.app

2. you can see voting lists and enroll button.

3. click enroll button.

- fill title, author, choices (at most 5).

- if you click submit button, wallet popup will be appeared. click confirm button.

4. 15 seconds later, you can see your voting in voting list.

5. click the title of your voting, you can vote them once.

## Feature

### Syntax
```
function enroll(votingItem);
```
* enroll a voting
* id is created automatically from 1 sequentially

### Parameter Values
|Argument|Type  |Description|
|--------|------|-----------|
|title   |string|the title of voting|
|author  |string|author of voting(if there is no author parameter, author value is filled by the author's address)|
|choices |string[]|choices of voting|

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
|Argument|Type  |Description|
|--------|------|-----------|
|id      |number|the id of voting|
|index   |number|the index of choices of the voting.|

### Syntax
```
function delete(id);
```
* delete the votingItem in id
