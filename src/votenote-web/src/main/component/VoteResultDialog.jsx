import React from 'react';
import { Pie } from 'react-chartjs-2';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class VoteResultDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                datasets: [{
                    data: this.props.votingItem.choices.map(v => v[1].length),
                    backgroundColor: ['#ff7675', '#55efc4', '#fdcb6e', '#81ecec', '#6c5ce7'],
                }],
                labels: this.props.votingItem.choices.map(v => v[0]),
            },
            chartOptions: { responsive: true },
        }
    }

    actions = [
        <FlatButton
            label="Close"
            primary={true}
            onClick={this.props.closeListener}
        />,
    ];
    render() {
        const customContentStyle = {
            width: '90%',
        };
        const customBodyStyle = {
            overflowY: 'scroll',
            overflowX: 'scroll'
        };
        return (
            <Dialog
                title="Vote Result"
                actions={this.actions}
                modal={false}
                open={this.props.isOpenModal}
                onRequestClose={this.props.closeListener}
                contentStyle={customContentStyle}
                bodyStyle={customBodyStyle}>
                <Pie data={this.state.chartData} options={this.state.chartOptions} />
            </Dialog>
        );
    }
}