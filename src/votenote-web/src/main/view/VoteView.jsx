import React from 'react';
import { withRouter } from "react-router-dom";
import './VoteView.css';
import SimpleButton from '../../common/SimpleButton';
import { callSmartContract, sendTransaction } from '../../common/dc/MessageDataController';
import MainDataController from '../datacontroller/MainDataController';

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
        // MainDataController.addEventListenerToWindow(this.voteViewlistener.bind(this));
        this.fetchVotingItem();
    }

    fetchVotingItem() {
        const { match: { params } } = this.props;
        callSmartContract("get", `[${params.id}]`, this.updateVotingItem.bind(this));
    }

    updateVotingItem(tx) {
        console.log(tx);
        let votingItem = JSON.parse(tx.result);
        this.setState({
            ...this.state,
            votingItem: {
                ...this.state.votingItem,
                id: votingItem.id,
                title: votingItem.title,
                author: votingItem.author,
                choices: votingItem.choices.map(choice => [choice[0], choice[1].length]),
            },
            isLoading: false,
        });
    }

    onVoteButtonClicked(index) {
        const { match: { params } } = this.props;
        const args = `[${params.id}, ${index}]`
        sendTransaction("", "vote", args, this.onVoteTransactionFinished.bind(this));
    }

    onVoteTransactionFinished() {
        this.props.history.push("/");
    }

    onDeleteButtonClicked() {
        const { match: { params } } = this.props;
        sendTransaction("", "delete", `[${params.id}]`, this.onVoteTransactionFinished.bind(this));
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
                    <SimpleButton color="orange" onClick={this.onDeleteButtonClicked.bind(this)}>Delete</SimpleButton>
                    {this.state.isVoted && <div className="VoteView-voted">You already voted!</div>}
                </div>
                :
                <div className="VoteView-loading">Loading...</div>
            }
        </div>;
    }
}

export default withRouter(VoteView);