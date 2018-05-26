import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { callSmartContract } from '../../common/dc/MessageDataController';
import EnrollDialog from '../component/EnrollDialog';
import VotingItemView from './VotingItemView';

// material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

class VotingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
            isOpenEnrollModal: false,
        }
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

    render() {
        const styles = {
            floatingActionButton: {
                position: 'fixed',
                right: '20px',
                bottom: '20px',
            },
            loading: {
                width: '100%',
                height: '600px',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center'
            }
        };
        return (
            <div className="VotingListView-Container">
                {!this.state.isLoading ?
                    <div>
                        <div>
                            {this.state.votingItems && this.state.votingItems.map((item, index) =>
                                <VotingItemView key={index} votingItem={item} onVotingItemClicked={() => { this.onVotingItemClicked(item.id); }}></VotingItemView>
                            )}
                        </div>
                        <FloatingActionButton style={styles.floatingActionButton} onClick={this.onEnrollModalOpen.bind(this)}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <EnrollDialog isOpenModal={this.state.isOpenEnrollModal} closeListener={this.onEnrollModalClosed.bind(this)} />
                    </div>
                    :
                    <div style={styles.loading}>
                        <CircularProgress size={80} thickness={5} style={{ marginTop: '70px' }} />
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(VotingListView);
