class MainDataController {

    isMobile() {
        var filter = 'win16|win32|win64|mac|macintel';
        if (navigator.platform) return filter.indexOf(navigator.platform.toLowerCase()) < 0 ? true : false;
    }

    isInstalledWallet() {
        if (!this.isMobile()) return window.webExtensionWallet !== undefined;
        // 모바일이면 일단 인스톨되어있다고 처리
        else return true;
    }
}

export default new MainDataController();