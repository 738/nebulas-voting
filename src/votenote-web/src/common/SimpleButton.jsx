import React from 'react';
import './SimpleButton.css';

class SimpleButton extends React.Component {
    
    render() {
        return (
            <div className="simpleButton" onClick={this.props.onClick} style={{backgroundColor: this.props.color}}>
                {this.props.children}
            </div>
        );
    }
}

export default SimpleButton;