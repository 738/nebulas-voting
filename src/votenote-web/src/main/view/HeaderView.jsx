import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { translate } from "react-i18next";
import qs from 'query-string'

import './HeaderView.css';
// material-ui
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: qs.parse(this.props.location.search).locale || 'en',
        }
    }

    componentDidMount() {
        // 쿼리스트링에 locale이 있으면 언어 변경
        const lang = qs.parse(this.props.location.search).locale;
        if (lang) this.props.i18n.changeLanguage(lang);
    }

    onTitleClicked() {
        window.location.reload();
    }

    onLanguageChanged(event, index, language) {
        // 언어 변경
        this.props.i18n.changeLanguage(language);
        // 쿼리스트링 추가
        const query = { locale: language };
        const searchString = qs.stringify(query);
        this.props.history.push({
            search: searchString
        });
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

export default withRouter(translate("translations")(HeaderView));
