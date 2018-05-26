import React from 'react';
import PendingDialog from '../component/PendingDialog';
import MainDataController from '../../common/dc/MainDataController';

// material-ui
import Snackbar from 'material-ui/Snackbar';

// 트랜잭션 성공, 실패, 대기에 관한 함수들 배치
class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPendingModal: false,
            isOpenSnackbar: false,
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
        });
    }

    onPendingModalClosed() {
        this.setState({
            ...this.state,
            isOpenPendingModal: false,
        });
    }

    onWalletInstallActionClicked() {
        if (MainDataController.isMobile()) window.open('https://nano.nebulas.io/index_en.html');
        else window.open('https://github.com/ChengOrangeJu/WebExtensionWallet');
    }

    onSnackbarOpen() {
        this.setState({
            ...this.state,
            isOpenSnackbar: true,
        })
    }

    onSnackbarClosed() {
        this.setState({
            ...this.state,
            isOpenSnackbar: false,
        })
    }

    renderBody() {

    }

    render() {
        return (
            <div>
                {this.renderBody()}
                <PendingDialog isOpenModal={this.state.isOpenPendingModal} closeListener={this.onPendingModalClosed.bind(this)} />
                <Snackbar
                    open={this.state.isOpenSnackbar}
                    message={"You have to install Nebulas Wallet"}
                    action="install"
                    autoHideDuration={5000}
                    onActionClick={this.onWalletInstallActionClicked.bind(this)}
                    onRequestClose={this.onSnackbarClosed.bind(this)}
                />
            </div>
        );
    }
}

export default MainView;