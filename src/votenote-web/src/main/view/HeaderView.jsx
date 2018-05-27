import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { translate } from "react-i18next";

import './HeaderView.css';
// material-ui
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
        }
    }

    onTitleClicked() {
        window.location.reload();
    }

    onLanguageChanged(event, index, language) {
        this.props.i18n.changeLanguage(language);
        this.setState({ language });
    }

    render() {
        return (
            <header className="HeaderView-Container">
                <div className="HeaderView-title" onClick={this.onTitleClicked.bind(this)}>{this.props.title}</div>
                <DropDownMenu className="HeaderView-changeLanguage" value={this.state.language} onChange={this.onLanguageChanged.bind(this)} labelStyle={{ color: 'white' }}>
                    <MenuItem value={'en'} primaryText="English" />
                    <MenuItem value={'zh'} primaryText="中" />
                    <MenuItem value={'ko'} primaryText="한글" />
                </DropDownMenu>
            </header>
        );
    }
}

export default translate("translations")(HeaderView);
