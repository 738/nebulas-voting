import React, { Component } from 'react';
import './VotingItemView.css';

class VotingItemView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="VotingItemView-Container">
                <div className="VotingItemView-id">{this.props.votingItem.id}</div>
                <div className="VotingItemView-title">{this.props.votingItem.title}</div>
                <div className="VotingItemView-author">{this.props.votingItem.author}</div>
            </div>
        );
    }
}

export default VotingItemView;