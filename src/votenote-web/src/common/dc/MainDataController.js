class MainDataController {
    isMobile() {
        var filter = 'win16|win32|win64|mac|macintel';
        if (navigator.platform) return filter.indexOf(navigator.platform.toLowerCase()) < 0 ? true : false;
    }
}

export default new MainDataController();