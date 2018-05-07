import React, { Component } from 'react';
import './VotingListView.css';
import VotingItemView from './VotingItemView';
import { Link } from 'react-router-dom';
import SimpleButton from '../../common/SimpleButton';
import { dappAddress } from '../../config';

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
                        <h3 className="VotingListView-title">- You can only vote once at one voting</h3>
                        <h3 className="VotingListView-title">- Developed by <a href="https://github.com/JonJee/nebulas-voting">Jon Jee</a> (Korea)</h3>
                        <h3 className="VotingListView-title">- Blockchain Powered by Nebulas</h3>
                        <h3 className="VotingListView-title">- This is Testnet</h3>
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
