import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import github from '../../img/github.png';
import './FooterView.css';

class FooterView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="FooterView-Container">
                copyright 2018 Jon Jee
                <br></br>
                <br></br>
                <a target="_blank" href="https://github.com/JonJee/nebulas-voting"><img src={github} width="25px"></img></a>
                <br></br>
                <br></br>
                Powered by Nebulas
            </header>
        );
    }
}

export default withRouter(FooterView);
