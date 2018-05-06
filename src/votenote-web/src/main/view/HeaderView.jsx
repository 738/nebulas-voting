import React, { Component } from 'react';
import './HeaderView.css';

class HeaderView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="HeaderView-Container">
                <div className="HeaderView-title">{this.props.title}</div>
            </header>
        );
    }
}

export default HeaderView;