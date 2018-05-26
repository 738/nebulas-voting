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

class VotingItemView extends Component {
    constructor(props) {
        super(props);
    }

    onVoteButtonClicked(index) {
        const { match: { params } } = this.props;
        const args = `[${params.id}, ${index}]`
        sendTransaction("", "vote", args, this.onVoteTransactionFinished.bind(this));
    }

    render() {
        const cardStyle = {
            width: 'calc(100% - 40px)',
        }
        var { title, author, choices, timestamp, like } = this.props.votingItem;
        var theNumberOfVoters = 0;
        for (var i = 0; i < choices.length; i++)
            theNumberOfVoters += choices[i][1].length;
        return (
            // <div className="VotingItemView-Container">
            //     <div className="VotingItemView-title">{title}</div>
            //     <div className="VotingItemView-author">{author}</div>
            //     <hr></hr>
            //     <div className="VotingItemView-date">{moment(timestamp).format('LLL')}</div>
            //     <div className="VotingItemView-voter">{theNumberOfVoters} voters</div>
            //     {/* <button className="VotingItemView-voteButton" onClick={this.props.onVotingItemClicked}>Vote</button> */}
            //     <button className="VotingItemView-voteButton" onClick={this.props.onVotingItemClicked}>vote</button>
            // </div>
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
                    {/* <FlatButton label="vote" /> */}
                </CardActions>
                <CardText expandable={true}>
                    <Divider style={{ marginBottom: '20px' }} />
                    <RadioButtonGroup name="shipSpeed">
                        {choices && choices.map((choice, index) =>
                            // <div key={index}>
                            //     <div className="VoteView-item">{choice[0]} {`(${choice[1]})`}</div>
                            //     <div className="VoteView-vote-button" onClick={() => { this.onVoteButtonClicked(index); }}>vote</div>
                            //     <br></br>
                            // </div>
                            <RadioButton
                                key={index}
                                value={choice[0]}
                                label={choice[0]}
                                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                uncheckedIcon={<ActionFavoriteBorder />}
                                style={{ marginBottom: 16 }}
                            // style={styles.radioButton}
                            />
                        )}
                    </RadioButtonGroup>
                    <RaisedButton label="vote" primary={true} />
                </CardText>
            </Card>
        );
    }
}

export default VotingItemView;