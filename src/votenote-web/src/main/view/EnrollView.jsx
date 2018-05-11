import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './EnrollView.css';
import SimpleButton from '../../common/SimpleButton';
import { postMessageToSmartContract } from '../../common/dc/MessageDataController';

class EnrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            choices: [''],
            isMultipleSelection: false,
        }
    }
    MAX_CHOICE = 5;

    onSubmitButtonClicked() {
        if (this.state.title === '' || this.state.author === '' || this.state.choices.some(value => !value)) {
            alert('fill the field');
            return;
        }
        var args = `[\"${this.state.title}\", \"${this.state.choices.join('|')}\", \"${this.state.author}\"]`;
        postMessageToSmartContract("enroll", args, "neb_sendTransaction");
    }

    onBackButtonClicked() {
        
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

    onIsMultipleSelectionClicked() {
        this.setState({
            ...this.state,
            isMultipleSelection: !this.state.isMultipleSelection,
        });
    }

    onChoicesChanged(index, e) {
        var tempChoices = this.state.choices;
        tempChoices[index] = e.target.value;
        console.log(tempChoices[index])
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

    render() {
        return (
            <div className="EnrollView-Container">
                <h1 className="EnrollView-title">Enroll a Voting</h1>
                <div className="EnrollView-form">
                    <div className="EnrollView-label">Title</div>
                    <input className="EnrollView-input" type="text" maxLength="64" size="40" value={this.state.title} onChange={this.onTitleChanged.bind(this)}></input>
                    <br></br>

                    <div className="EnrollView-label">Author</div>
                    <input className="EnrollView-input" type="text" maxLength="35" size="40" value={this.state.author} onChange={this.onAuthorChanged.bind(this)}></input>
                    <br></br>
                    <div>
                        <input id="isMultipleSelection" type="checkbox" checked={this.state.isMultipleSelection} onClick={this.onIsMultipleSelectionClicked.bind(this)}/>
                        <label for="isMultipleSelection">Multiple Selection</label>
                    
                    </div>
                    { this.state.choices.map((choice, index) =>
                        <div key={index}>
                            <div className="EnrollView-label">Choice #{index + 1}</div>
                            <input className="EnrollView-input" type="text" maxLength="32" size="40" value={choice} onChange={(e) => { this.onChoicesChanged(index, e) }}></input>
                            <br></br>
                        </div>
                    )}

                    <div className="EnrollView-add-choices-button" onClick={this.onAddButtonClicked.bind(this)}>+</div>
                    <br></br>

                    <SimpleButton color="#FFCCBC" onClick={this.onSubmitButtonClicked.bind(this)}>submit</SimpleButton>
                    <SimpleButton color="#FFFDE7" onClick={this.onBackButtonClicked.bind(this)}><Link to="/votinglist">back</Link></SimpleButton>
                </div>
            </div>
        );
    }
}

export default EnrollView;
