# VoteNote

> Voting Platform on Blockchain

* Blockchain Powered by Nebulas
* developed by Jon Jee

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