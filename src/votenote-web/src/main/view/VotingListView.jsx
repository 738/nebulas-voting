import React, { Component } from 'react';
import './VotingListView.css';
import VotingItemView from './VotingItemView';

class VotingListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="VotingListView-Container">
                <h1 className="VotingListView-title">Voting List</h1>
                <VotingItemView votingItem={{id: 'id', title: 'title', author: 'author'}}></VotingItemView>
                {this.props.votingItems.map((item, index) => 
                    <VotingItemView key={index} votingItem={item}></VotingItemView>
                )}
                <div className="VotingListView-enroll-button">enroll vote</div>
            </div>
        );
    }
}

export default VotingListView;
