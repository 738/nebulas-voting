import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './EnrollView.css';

class EnrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            choices: '',
        }
    }
    dappAddress = "n22db3WJchN6sWSnKK2AnuzxMj5BCAgUUp4";

    onSubmitButtonClicked() {
        console.log("********* call smart contract \"sendTransaction\" *****************");
        var func = "enroll";
        var args = `[\"${this.state.title}\", \"${this.state.choices}\", \"${this.state.author}\"]`;
        window.postMessage({
            "target": "contentscript",
            "data": {
                "to": this.dappAddress,
                "value": "0",
                "contract": {
                    "function": func,
                    "args": args,
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
        console.log(this.context.history);
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

    onChoicesChanged(e) {
        this.setState({
            ...this.state,
            choices: e.target.value,
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
                    <div className="EnrollView-label">Choice #1</div>
                    <input className="EnrollView-input" type="text" maxLength="32" size="40" value={this.state.choices} onChange={this.onChoicesChanged.bind(this)}></input>
                    <br></br>
                    <div className="EnrollView-add-choices-button">+</div>
                    <br></br>
                    <div className="EnrollView-submit-button" onClick={this.onSubmitButtonClicked.bind(this)}>submit</div>
                    <div className="EnrollView-back-button" onClick={this.onBackButtonClicked.bind(this)}><Link to="/votinglist">back</Link></div>
                </div>
            </div>
        );
    }
}

export default EnrollView;
