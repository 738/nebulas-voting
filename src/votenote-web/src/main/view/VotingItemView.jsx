import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './VotingItemView.css';

class VotingItemView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="VotingItemView-Container">
                <div className="VotingItemView-id">{this.props.isTableHead ? 'id' :this.props.votingItem.id}</div>
        <div className="VotingItemView-title">{this.props.isTableHead ? 'title' : <Link to={`/vote/${this.props.votingItem.id}`}>{this.props.votingItem.title}</Link>}</div>
                <div className="VotingItemView-author">{this.props.isTableHead ? 'author' : this.props.votingItem.author}</div>
            </div>
        );
    }
}

export default VotingItemView;