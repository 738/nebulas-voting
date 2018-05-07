import React from 'react';
import './VoteView.css';
import { dappAddress } from '../../config';
import SimpleButton from '../../common/SimpleButton';

class VoteView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItem: {},
            isLoading: true,
            isVoted: false,
        }
    }

    componentDidMount() {
        this.fetchVotingItem();
    }

    fetchVotingItem() {
        const { match: { params } } = this.props;
        var func = "get";
        var args = `[${params.id}]`;
        window.postMessage({
            "target": "contentscript",
            "data": {
                "to": dappAddress,
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
                            },
                            isLoading: false,
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }.bind(this));
    }

    onVoteButtonClicked(index) {
        const { match: { params } } = this.props;
        var func = "vote";
        var args = `[${params.id}, ${index}]`
        // window.postMessage({
        //     "target": "contentscript",
        //     "data": {
        //         "to": dappAddress,
        //         "value": "0",
        //         "contract": {
        //             "function": func,
        //             "args": args,
        //         }
        //     },
        //     "method": "neb_call"
        // }, "*");
    
        // var result;
        // window.addEventListener('message', function (e) {
        //     if (e.data.data.neb_call) {
        //         result = e.data.data.neb_call.result;
        //         if (result === 'null') {
        //             console.log('result is null');
        //         } else {
        //             try {
        //                 result = JSON.parse(e.data.data.neb_call.result)
        //                 if (result === '') {
        //                     this.setState({
        //                         ...this.state,
        //                         isVoted: true,
        //                     })
        //                 }
        //             } catch (err) {
        //                 console.log(err);
        //             }
        //         }
        //     }
        // }.bind(this));

        window.postMessage({
            "target": "contentscript",
            "data": {
                "to": dappAddress,
                "value": "0",
                "contract": {
                    "function": func,
                    "args": args,
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    }

    render() {
        return <div className="VoteView-container">
            <h1 className="VoteView-title">Vote</h1>
            { !this.state.isLoading ?
                <div>
                    <div className="VoteView-item">Id</div>
                    <div className="VoteView-item">{this.state.votingItem.id}</div>
                    <br></br>
                    <div className="VoteView-item">Title</div>
                    <div className="VoteView-item">{this.state.votingItem.title}</div>
                    <br></br>

                    <div className="VoteView-item">Author</div>
                    <div className="VoteView-item">{this.state.votingItem.author}</div>
                    <br></br>

                    {this.state.votingItem.choices && this.state.votingItem.choices.map((choice, index) => 
                        <div key={index}>
                            <div className="VoteView-item">Choice #{index + 1}</div>
                            <div className="VoteView-item">{choice[0]} {`(${choice[1]})`}</div>
                            <div className="VoteView-vote-button" onClick={() => { this.onVoteButtonClicked(index); }}>vote</div>
                            <br></br>
                        </div>
                    )}
                    { this.state.isVoted && <div className="VoteView-voted">You already voted!</div>}
                </div>
                :
                <div className="VoteView-loading">Loading...</div>
            }
        </div>;
    }
}

export default VoteView;