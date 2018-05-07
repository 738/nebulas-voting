import React, { Component } from 'react';
import './HeaderView.css';
import { Link } from 'react-router-dom'

class HeaderView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="HeaderView-Container">
                <div className="HeaderView-title"><Link to="/" style={{textDecoration: "none", color: "white"}}>{this.props.title}</Link></div>
            </header>
        );
    }
}

export default HeaderView;