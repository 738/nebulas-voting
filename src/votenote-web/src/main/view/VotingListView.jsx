import React, { Component } from 'react';
import './VotingListView.css';
import VotingItemView from './VotingItemView';
import { Link } from 'react-router-dom';
import SimpleButton from '../../common/SimpleButton';
import { dappAddress } from '../../config';
import logo from '../../img/logo.png';

class VotingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.fetchVotingList();
    }

    fetchVotingList() {
        var func = "getVotingList";
        window.postMessage({
            "target": "contentscript",
            "data": {
                "to": dappAddress,
                "value": "0",
                "contract": {
                    "function": func,
                    "args": "",
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
                            votingItems: result,
                            isLoading: false,
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="VotingListView-Container">
                { !this.state.isLoading ?
                    <div>
                        <h1 className="VotingListView-title">Voting List</h1>
                        <div className="VotingListView-description">
                        - You can only vote once at one voting<br/>
                        - Developed by <a href="https://github.com/JonJee">Jon Jee</a> (Korea)<br/>
                        - Blockchain Powered by Nebulas (This is Testnet)<br/>
                        - Transaction is confirmed in 15 seconds<br/>
                        </div>
                        <img src={logo} width="100px"/>
                        <VotingItemView isTableHead={true}></VotingItemView>
                        { this.state.votingItems && this.state.votingItems.map((item, index) =>
                            <VotingItemView key={index} votingItem={item}></VotingItemView>
                        )}
                        <SimpleButton color="#FFCCBC"><Link to="/enroll">enroll</Link></SimpleButton>
                    </div>
                    :
                    <div className="VotingListView-loading">Loading... 
                        <div style={{fontSize: '15px'}}>If it lasts more than 5 seconds, you should install <a target="_blank" href="https://github.com/ChengOrangeJu/WebExtensionWallet">WebExtensionWallet</a> or set the network as Testnet</div>
                    </div>
                }
            </div>
        );
    }
}

export default VotingListView;
