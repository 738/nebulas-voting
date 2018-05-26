import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './HeaderView.css';

class HeaderView extends Component {
    constructor(props) {
        super(props);
    }

    onTitleClicked() {
        window.location.reload();
    }

    render() {
        return (
            <header className="HeaderView-Container">
                <div className="HeaderView-title" onClick={this.onTitleClicked.bind(this)}>{this.props.title}</div>
            </header>
        );
    }
}

export default withRouter(HeaderView);
