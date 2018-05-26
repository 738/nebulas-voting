import React from 'react';
import PendingDialog from '../component/PendingDialog';

// 트랜잭션 성공, 실패, 대기에 관한 함수들 배치
class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPendingModal: false,
        }
    }

    onTransactionSucceed() {
        window.location.reload();
    }

    onTransactionFailed() {
        alert("Transaction is failed!");
        this.setState({
            ...this.state,
            isOpenPendingModal: false,
        });
    }

    onPendingModalOpen() {
        this.setState({
            ...this.state,
            isOpenPendingModal: true,
        })
    }

    onPendingModalClosed() {
        this.setState({
            ...this.state,
            isOpenPendingModal: false,
        })
    }

    renderBody() {

    }

    render() {
        return (
            <div>
                {this.renderBody()}
                <PendingDialog isOpenModal={this.state.isOpenPendingModal} closeListener={this.onPendingModalClosed.bind(this)} />
            </div>
        );
    }
}

export default MainView;