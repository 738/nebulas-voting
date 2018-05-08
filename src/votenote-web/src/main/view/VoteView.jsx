import React from 'react';
import './VoteView.css';
import SimpleButton from '../../common/SimpleButton';
import { postMessageToSmartContract } from '../../common/dc/MessageDataController';

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
        this.addListener();
        this.fetchVotingItem();
    }

    addListener() {
        window.addEventListener('message', function (e) {
            if (e.data.data.neb_call) {
                var result = e.data.data.neb_call.result;
                if (result === 'null') {
                    console.log('result is null');
                } else {
                    try {
                        result = JSON.parse(e.data.data.neb_call.result);
                        console.log('AAA ', result);
                        this.setState({
                            ...this.state,
                            votingItem: {
                                ...this.state.votingItem,
                                id: result.id || this.state.votingItem.id,
                                title: result.title || this.state.votingItem.title,
                                author: result.author || this.state.votingItem.author,
                                choices: result.choices ? result.choices.map((choice) =>
                                    [choice[0], choice[1].length])
                                    :
                                    this.state.votingItem.choices,
                            },
                            isLoading: false,
                            isVoted: result === 'you can vote just once' ? true : false,
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }.bind(this));
    }

    fetchVotingItem() {
        const { match: { params } } = this.props;
        postMessageToSmartContract("get", `[${params.id}]`, "neb_call");
    }

    onVoteButtonClicked(index) {
        const { match: { params } } = this.props;
        postMessageToSmartContract("vote", `[${params.id}, ${index}]`, "neb_call");

        // 이미 투표했으면 transaction을 보내지 않음
        setTimeout(() => {
            if (!this.state.isVoted) 
                postMessageToSmartContract("vote", `[${params.id}, ${index}]`, "neb_sendTransaction");
        }, 3000);
    }

    render() {
        return <div className="VoteView-container">
            <h1 className="VoteView-title">Vote</h1>
            {!this.state.isLoading ?
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
                    {this.state.isVoted && <div className="VoteView-voted">You already voted!</div>}
                </div>
                :
                <div className="VoteView-loading">Loading...</div>
            }
        </div>;
    }
}

export default VoteView;