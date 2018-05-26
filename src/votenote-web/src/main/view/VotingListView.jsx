import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './VotingListView.css';
import VotingItemView from './VotingItemView';
import SimpleButton from '../../common/SimpleButton';
import logo from '../../img/logo.png';
import { callSmartContract } from '../../common/dc/MessageDataController';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EnrollDialog from '../component/EnrollDialog';

class VotingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
            isOpenEnrollModal: false,
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

    onEnrollModalOpen = () => this.setState({ isOpenEnrollModal: true });
    onEnrollModalClosed = () => this.setState({ isOpenEnrollModal: false });

    onVotingItemClicked(id) {
        this.props.history.push(`/vote/${id}`);
    }

    render() {
        const style = {
            marginRight: 20,
        };
        return (
            <div className="VotingListView-Container">
                {!this.state.isLoading ?
                    <div>
                        <div>
                            <h1 className="VotingListView-title">Voting List</h1>
                            {this.state.votingItems && this.state.votingItems.map((item, index) =>
                                <VotingItemView key={index} votingItem={item} onVotingItemClicked={() => { this.onVotingItemClicked(item.id); }}></VotingItemView>
                            )}
                        </div>
                        <FloatingActionButton style={style} onClick={this.onEnrollModalOpen.bind(this)}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <EnrollDialog isOpenModal={this.state.isOpenEnrollModal} closeListener={this.onEnrollModalClosed.bind(this)}/>
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
