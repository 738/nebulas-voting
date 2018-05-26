import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './EnrollView.css';
import SimpleButton from '../../common/SimpleButton';
import { sendTransaction } from '../../common/dc/MessageDataController';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class EnrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            choices: [''],
        }
    }
    MAX_CHOICE = 5;

    onSubmitButtonClicked() {
        if (this.state.title === '' || this.state.author === '' || this.state.choices.some(value => !value)) {
            alert('fill the field');
            return;
        }
        var args = `[\"{\\\"title\\\": \\\"${this.state.title}\\\", \\\"author\\\": \\\"${this.state.author}\\\", \\\"choices\\\": [${this.state.choices.map(choice => `\\\"${choice}\\\"`).join(',')}]}\"]`;
        sendTransaction('0', 'enroll', args, this.onEnrollTransactionFinished.bind(this));
    }

    onEnrollTransactionFinished() {
        this.props.history.push('/');
    }

    onBackButtonClicked() {
        this.props.history.push('/');
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

    render() {
        return (
            <div className="EnrollView-Container">
                <h1 className="EnrollView-title">Enroll a Voting</h1>
                <div className="EnrollView-form">
                    <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        value={this.state.author}
                        onChange={this.onAuthorChanged.bind(this)}
                    />
                    <br />
                    <TextField
                        hintText="Author"
                        floatingLabelText="Author"
                        value={this.state.author}
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
                            />
                            <br />
                        </div>
                    )}
                    <RaisedButton onClick={this.onAddButtonClicked.bind(this)}>+</RaisedButton>
                    <br></br>
                    <RaisedButton onClick={this.onSubmitButtonClicked.bind(this)}>submit</RaisedButton>
                    <RaisedButton onClick={this.onBackButtonClicked.bind(this)}>back</RaisedButton>
                </div>
            </div>
        );
    }
}

export default withRouter(EnrollView);
