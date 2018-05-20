import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './VotingListView.css';
import VotingItemView from './VotingItemView';
import SimpleButton from '../../common/SimpleButton';
import logo from '../../img/logo.png';
import { callSmartContract } from '../../common/dc/MessageDataController';

class VotingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
        }
        this.onVotingItemClicked = this.onVotingItemClicked.bind(this);
    }

    componentDidMount() {
        this.fetchVotingList();
    }

    fetchVotingList() {
        callSmartContract("getVotingList", "", this.updateVotingList.bind(this));
    }

    updateVotingList(tx) {
        this.setState({
            ...this.state,
            votingItems: JSON.parse(tx.result),
            isLoading: false,
        });
    }

    onErollButtonClicked() {
        this.props.history.push('/enroll');
    }

    onVotingItemClicked(id) {
        this.props.history.push(`/vote/${id}`);
    }

    render() {
        console.log(this.state.votingItems);
        return (
            <div className="VotingListView-Container">
                {!this.state.isLoading ?
                    <div>
                        <h1 className="VotingListView-title">Voting List</h1>
                        <div className="VotingListView-description">
                            - You can only vote once at one voting<br />
                            - Developed by <a href="https://github.com/JonJee/nebulas-voting">Jon Jee</a><br />
                            - Blockchain Powered by Nebulas (This is Mainnet)<br />
                            - Transaction is confirmed in 15 seconds<br />
                        </div>
                        <img src={logo} width="100px" />
                        <VotingItemView isTableHead={true}></VotingItemView>
                        {this.state.votingItems && this.state.votingItems.map((item, index) =>
                            <VotingItemView key={index} votingItem={item} onVotingItemClicked={() => { this.onVotingItemClicked(item.id); }}></VotingItemView>
                        )}
                        <SimpleButton color="#FFCCBC" onClick={this.onErollButtonClicked.bind(this)}>enroll</SimpleButton>
                    </div>
                    :
                    <div className="VotingListView-loading">Loading...
                        <div style={{ fontSize: '15px' }}>If it lasts more than 5 seconds, you should install <a target="_blank" href="https://github.com/ChengOrangeJu/WebExtensionWallet">WebExtensionWallet</a> or set the network as Mainnet</div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(VotingListView);
