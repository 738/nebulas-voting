import React from 'react';
import { translate } from 'react-i18next';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

class PendingDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    onRefresh() {
        window.location.reload();
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.t("Close")}
                secondary={true}
                onClick={this.props.closeListener}
            />,
            <FlatButton
                label={this.props.t("Refresh Now")}
                primary={true}
                onClick={this.onRefresh.bind(this)}
            />,
        ];
        return (
            <Dialog
                title={this.props.t("Wait for a moment")}
                actions={actions}
                modal={false}
                open={this.props.isOpenModal}
                onRequestClose={this.props.closeListener}
                bodyStyle={{textAlign: 'center'}}>
                <p>{this.props.t("If your transaction is succeed, it will be refreshed.")}</p>
                <CircularProgress />
            </Dialog>
        );
    }
}

export default translate("translations")(PendingDialog);