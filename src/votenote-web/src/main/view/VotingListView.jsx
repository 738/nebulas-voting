import React, { Component } from 'react';
import './VotingListView.css';
import VotingItemView from './VotingItemView';

class VotingListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="votingListViewContainer">
                {this.props.votingItems.map((item, index) => 
                    <VotingItemView key={index} votingItem={item}></VotingItemView>
                )}
            </div>
        );
    }
}

export default VotingListView;
