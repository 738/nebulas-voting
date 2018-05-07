import React from 'react';

class VoteView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItem: {},
        }
    }

    dappAddress = "n22db3WJchN6sWSnKK2AnuzxMj5BCAgUUp4";

    componentDidMount() {
        this.fetchVotingItem();
    }

    fetchVotingItem() {
        var func = "get";
        var args = `[1]`
        window.postMessage({
            "target": "contentscript",
            "data": {
                "to": this.dappAddress,
                "value": "0",
                "contract": {
                    "function": func,
                    "args": args,
                }
            },
            "method": "neb_call"
        }, "*");

        window.addEventListener('message', function (e) {
            if (e.data.data.neb_call) {
                var result = e.data.data.neb_call.result;
                if (result === 'null') {
                    console.log('result is null');
                } else {
                    try {
                        result = JSON.parse(e.data.data.neb_call.result)
                        console.log(result);
                        this.setState({
                            ...this.state,
                            votingItem: {
                                ...result,
                                choices: result.choices.map((choice) => 
                                    [choice[0], choice[1].length]
                                ),
                            }
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }.bind(this));
    }

    render() {
        return <div className="VoteView-container">
            <h1>Vote</h1>
            <div className="VoteView-title">Title: {this.state.votingItem.title}</div>
            <div className="VoteView-author">Author: {this.state.votingItem.author}</div>
            {this.state.votingItem.choices && this.state.votingItem.choices.map((choice, index) => 
                <div key={index}>
                    <div className="VoteView-choice">Choice #{index + 1}: {choice[0]}</div>
                    <div className="VoteView-choice">Selected by {choice[1]} people</div>
                </div>
            )}
        </div>;
    }
}

export default VoteView;