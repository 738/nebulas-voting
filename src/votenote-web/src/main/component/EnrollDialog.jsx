import React from 'react';
import ContractDataController from '../../common/dc/ContractDataController';
import MainView from '../view/MainView';
import MainDataController from '../../common/dc/MainDataController';
import { translate } from "react-i18next";

// material-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

class EnrollDialog extends MainView {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            choices: [''],
            isOpenPendingModal: false,
        }
        console.log('AA', this.props.i18n);
    }
    MAX_CHOICE = 5;

    onSubmitButtonClicked() {
        if (this.state.title === '' || this.state.author === '' || this.state.choices.some(value => !value)) {
            alert('fill the field');
            return;
        }
        if (this.state.choices.length < 2) {
            alert('fill options at least 2');
            return;
        }
        // 지갑이 없으면 스낵바 오픈
        if (!MainDataController.isInstalledWallet()) {
            this.onSnackbarOpen();
            return;
        }
        var args = `[\"{\\\"title\\\": \\\"${this.state.title}\\\", \\\"author\\\": \\\"${this.state.author}\\\", \\\"choices\\\": [${this.state.choices.map(choice => `\\\"${choice}\\\"`).join(',')}]}\"]`;
        ContractDataController.sendTransaction('0', 'enroll', args, this.onPendingModalOpen.bind(this), this.onTransactionSucceed.bind(this), this.onTransactionFailed.bind(this));
    }

    onTitleChanged(e) {
        this.setState({
            ...this.state,
            title: e.target.value,
        });
    }

    onAuthorChanged(e) {
        this.setState({
            ...this.state,
            author: e.target.value,
        });
    }

    onChoicesChanged(index, e) {
        var tempChoices = this.state.choices;
        tempChoices[index] = e.target.value;
        this.setState({
            ...this.state,
            choices: tempChoices,
        });
    }

    onAddButtonClicked() {
        if (this.state.choices.length >= this.MAX_CHOICE) {
            alert('cannot add more than 5')
            return;
        }
        this.setState({
            ...this.state,
            choices: [
                ...this.state.choices,
                ''
            ],
        });
    }

    onRemoveButtonClicked(index) {
        this.setState({
            ...this.state,
            choices: [
                ...this.state.choices.slice(0, index),
                ...this.state.choices.slice(index + 1, this.state.choices.length)
            ],
        });
    }

    renderBody() {
        const { t } = this.props;
        const customContentStyle = {
            width: '90%',
        };
        const customBodyStyle = {
            overflowY: 'scroll',
            overflowX: 'scroll'
        };
        const actions = [
            <FlatButton
                label={t('Cancel')}
                secondary={true}
                onClick={this.props.closeListener}
            />,
            <FlatButton
                label={t('Enroll')}
                primary={true}
                onClick={this.onSubmitButtonClicked.bind(this)}
            />,
        ];
        return (
            <div>
                <Dialog
                    title={t('Enroll Your Voting')}
                    actions={actions}
                    modal={false}
                    open={this.props.isOpenModal}
                    onRequestClose={this.props.closeListener}
                    contentStyle={customContentStyle}
                    bodyStyle={customBodyStyle}>
                    <TextField
                        hintText={t('Title')}
                        floatingLabelText={t('Title')}
                        value={this.state.title}
                        maxLength='35'
                        onChange={this.onTitleChanged.bind(this)}
                    />
                    <br />
                    <TextField
                        hintText={t('Author')}
                        floatingLabelText={t('Author')}
                        value={this.state.author}
                        maxLength='35'
                        onChange={this.onAuthorChanged.bind(this)}
                    />
                    <br />
                    {this.state.choices.map((choice, index) =>
                        <div key={index}>
                            <TextField
                                hintText={`#${index + 1}`}
                                floatingLabelText={`#${index + 1}`}
                                value={choice}
                                onChange={(e) => { this.onChoicesChanged(index, e) }}
                                maxLength='35'
                                style={{ width: '80%' }}
                            />
                            {this.state.choices.length - 1 === index ?
                                <IconButton onClick={this.onAddButtonClicked.bind(this)}>
                                    <ContentAdd />
                                </IconButton>
                                :
                                <IconButton onClick={(() => { this.onRemoveButtonClicked(index) }).bind(this)}>
                                    <ContentRemove />
                                </IconButton>
                            }
                            <br />
                        </div>
                    )}
                </Dialog>
            </div>
        );
    }
}

export default translate("translations")(EnrollDialog);