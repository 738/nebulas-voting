import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { sendTransaction } from '../../common/dc/MessageDataController';
import { Pie } from 'react-chartjs-2';


export default class VoteResultDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                datasets: [{
                    data: this.props.votingItem.choices.map(v => v[1].length),
                    backgroundColor: [ '#ff7675', '#55efc4', '#fdcb6e', '#81ecec', '#6c5ce7'],
                    // backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
                }],
                labels: this.props.votingItem.choices.map(v => v[0]),
            },
            chartOptions: { responsive: true },
        }
    }

    componentDidMount() {
        const { choices } = this.props.votingItem;
        console.log(this.state.chartData);

        // const resultData = {
        //     // datasets: [{
        //     //     data: choices.map(v => v[1].length)
        //     // }],
        //     // labels: choices.map(v => v[0]),
        //     datasets: [{
        //         data: [10, 20, 30]
        //     }],

        //     // These labels appear in the legend and in the tooltips when hovering different arcs
        //     labels: [
        //         'Red',
        //         'Yellow',
        //         'Blue'
        //     ]
        // }
        // var config = {
        //     type: 'pie',
        //     data: resultData,
        //     options: {
        //         responsive: true
        //     }
        // };
        // var ctx = document.getElementById('ctx').getContext('2d');
        // var voteResultChart = new Chart(ctx, config);
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
                <div>
                    <Pie data={this.state.chartData} options={this.state.chartOptions} />
                </div>
            </Dialog>
        );
    }
}