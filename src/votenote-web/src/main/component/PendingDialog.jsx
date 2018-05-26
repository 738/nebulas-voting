import React from 'react';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

export default class PendingDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    actions = [
        <FlatButton
            label="Close"
            primary={true}
            onClick={this.props.closeListener}
        />,
    ];
    render() {
        return (
            <Dialog
                title="Wait for a moment"
                actions={this.actions}
                modal={false}
                open={this.props.isOpenModal}
                onRequestClose={this.props.closeListener}
                bodyStyle={{textAlign: 'center'}}>
                <p>If your  transaction is succeed, it will be refreshed.</p>
                <CircularProgress />
            </Dialog>
        );
    }
}