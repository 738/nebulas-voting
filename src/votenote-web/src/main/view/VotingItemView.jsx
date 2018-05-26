import React, { Component } from 'react';
import moment from 'moment';
import './VotingItemView.css';
import SimpleButton from '../../common/SimpleButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class VotingItemView extends Component {
    constructor(props) {
        super(props);
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
                    <FlatButton label="vote" />
                </CardActions>
                <CardText expandable={true}>
                    <FlatButton label="vote" />
                    
                </CardText>
            </Card>
        );
    }
}

export default VotingItemView;