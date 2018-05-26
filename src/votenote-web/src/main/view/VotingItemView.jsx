import React, { Component } from 'react';
import moment from 'moment';
import './VotingItemView.css';
import SimpleButton from '../../common/SimpleButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { callSmartContract, sendTransaction } from '../../common/dc/MessageDataController';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import VoteResultDialog from '../component/VoteResultDialog';

class VotingItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteIndex: -1,
            isOpenResultModal: false,
        }
    }

    onVoteButtonClicked(index) {
        if (index < 0) {
            alert('you must vote one item');
            return;
        }
        const args = `[${this.props.votingItem.id}, ${index}]`
        sendTransaction("", "vote", args, undefined);
    }

    onDeleteButtonClicked() {
        sendTransaction("", "delete", `[${this.props.votingItem.id}]`, undefined);
    }

    onRadioButtonClicked(index) {
        this.setState({
            ...this.state,
            voteIndex: index,
        });
    }

    onResultModalOpen = () => this.setState({ isOpenResultModal: true });
    onResultModalClosed = () => this.setState({ isOpenResultModal: false });

    render() {
        const cardStyle = {
            width: 'calc(100% - 40px)',
        }
        var { title, author, choices, timestamp, like } = this.props.votingItem;
        var theNumberOfVoters = 0;
        for (var i = 0; i < choices.length; i++)
            theNumberOfVoters += choices[i][1].length;
        return (
            <div>
                <Card className="VotingItemView-Card"
                    style={cardStyle}>
                    <CardHeader
                        title={title}
                        subtitle={author}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardActions>
                        <FlatButton label={moment(timestamp).format('LLL')} />
                        <FlatButton label={`${theNumberOfVoters} voters`} />
                    </CardActions>
                    <CardText expandable={true}>
                        <Divider style={{ marginBottom: '20px' }} />
                        <RadioButtonGroup name="choiceButtonGroup" defaultSelected="0">
                            {choices && choices.map((choice, index) =>
                                <RadioButton
                                    key={index}
                                    value={index}
                                    label={choice[0]}
                                    checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                    uncheckedIcon={<ActionFavoriteBorder />}
                                    style={{ marginBottom: 16 }}
                                    onClick={(() => { this.onRadioButtonClicked(index) }).bind(this)}
                                />
                            )}
                        </RadioButtonGroup>
                        <RaisedButton label="vote" primary={true} onClick={(() => { this.onVoteButtonClicked(this.state.voteIndex); }).bind(this)} />
                        <RaisedButton label="result" secondary={true} onClick={this.onResultModalOpen.bind(this)} style={{ marginLeft: '10px' }} />
                        <FlatButton label="delete" secondary={true} onClick={(() => { this.onDeleteButtonClicked(this.state.voteIndex); }).bind(this)} style={{ marginLeft: '10px' }} />
                    </CardText>
                </Card>
                <VoteResultDialog votingItem={this.props.votingItem} isOpenModal={this.state.isOpenResultModal} closeListener={this.onResultModalClosed.bind(this)}/>
            </div>
        );
    }
}

export default VotingItemView;