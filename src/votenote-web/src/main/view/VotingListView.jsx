import React, { Component } from 'react';
import './VotingListView.css';
import VotingItemView from './VotingItemView';
import { Link } from 'react-router-dom';
import SimpleButton from '../../common/SimpleButton';
import logo from '../../img/logo.png';
import { postMessageToSmartContract } from '../../common/dc/MessageDataController';
import MainDataController from '../datacontroller/MainDataController';

class VotingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        MainDataController.addEventListenerToWindow(this.getVotingListlistener.bind(this));
        this.fetchVotingList();
    }

    fetchVotingList() {
        postMessageToSmartContract("getVotingList", "", "neb_call");
    }

    // window의 eventlistener에서 result가 들어오면 실행되는 함수
    getVotingListlistener(func, result) {
        if (func === "getVotingList") {
            this.setState({
                ...this.state,
                votingItems: result.votingLists,
                isLoading: false,
            });
        }
    }

    render() {
        return (
            <div className="VotingListView-Container">
                {!this.state.isLoading ?
                    <div>
                        <h1 className="VotingListView-title">Voting List</h1>
                        <div className="VotingListView-description">
                            - You can only vote once at one voting<br />
                            - Developed by <a href="https://github.com/JonJee">Jon Jee</a> (Korea)<br />
                            - Blockchain Powered by Nebulas (This is Mainnet)<br />
                            - Transaction is confirmed in 15 seconds<br />
                        </div>
                        <img src={logo} width="100px" />
                        <VotingItemView isTableHead={true}></VotingItemView>
                        {this.state.votingItems && this.state.votingItems.map((item, index) =>
                            <VotingItemView key={index} votingItem={item}></VotingItemView>
                        )}
                        <SimpleButton color="#FFCCBC"><Link to="/enroll">enroll</Link></SimpleButton>
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

export default VotingListView;
