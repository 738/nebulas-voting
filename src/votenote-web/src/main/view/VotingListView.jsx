import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ContractDataController from '../../common/dc/ContractDataController';
import EnrollDialog from '../component/EnrollDialog';
import VotingItemView from './VotingItemView';
import MainView from './MainView';
import MainDataController from '../../common/dc/MainDataController';
import { translate } from 'react-i18next';

// material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

class VotingListView extends MainView {
    constructor(props) {
        super(props);
        this.state = {
            votingItems: [],
            isLoading: true,
            isOpenEnrollModal: false,
            searchVoting: '',
        }
    }

    componentDidMount() {
        this.fetchVotingList();
        // 월렛이 없다면 스낵바 띄움
        if (!MainDataController.isInstalledWallet()) this.onSnackbarOpen();
    }

    fetchVotingList() {
        ContractDataController.callSmartContract("getVotingList", "", this.updateVotingList.bind(this));
    }

    updateVotingList(tx) {
        this.setState({
            ...this.state,
            votingItems: JSON.parse(tx.result),
            isLoading: false,
        });
    }

    onEnrollModalOpen() {
        this.setState({
            ...this.state,
            isOpenEnrollModal: true,
        });
    }

    onEnrollModalClosed() {
        this.setState({
            ...this.state,
            isOpenEnrollModal: false
        });
    }

    onSearchVotingChanged(e) {
        this.setState({
            ...this.state,
            searchVoting: e.target.value,
        });
    }

    renderBody() {
        const { votingItems, searchVoting } = this.state;
        let votingItemsFiltered = votingItems && votingItems.filter(item =>
            this.state.searchVoting === '' || item.title.toLowerCase().indexOf(this.state.searchVoting.toLowerCase()) >= 0 || item.author.toLowerCase().indexOf(this.state.searchVoting.toLowerCase()) >= 0
        );
        const styles = {
            container: {
                height: 'calc(100% + 400px)',
            },
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
            },
            searchFieldWrapper: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            },
            paperStyle: {
                height: '200px',
                width: 'calc(100% - 40px)',
                margin: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        };

        return (
            <div style={styles.container}>
                {!this.state.isLoading ?
                    <div>
                        <div style={styles.searchFieldWrapper}>
                            <TextField
                                hintText={this.props.t('Search Voting')}
                                style={{ width: '10', marginRight: '20px' }}
                                value={this.state.searchVoting}
                                onChange={this.onSearchVotingChanged.bind(this)}
                            /> <br />
                        </div>
                        <div>
                            {votingItemsFiltered.length > 0 ? votingItemsFiltered.map((item, index) =>
                                <VotingItemView key={index} votingItem={item} onVotingItemClicked={() => { this.onVotingItemClicked(item.id); }}></VotingItemView>
                            )
                                :
                                <Paper style={styles.paperStyle} zDepth={3}>
                                    <div style={{fontSize: '24px'}}>{this.props.t('There is no voting')}</div>
                                </Paper>
                            }
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

export default translate("translations")(VotingListView);
