import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

i18n.init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "Enroll Your Voting": "Enroll Your Voting",
                "Author": "Author",
                "Title": "Title",
                "Vote": "Vote",
                "Result": "Result",
                "Delete": "Delete",
                "Voter": "Voter",
                "Voters": "Voters",
                "Cancel": "Cancel",
                "Enroll": "Enroll",
                "Close": "Close",
                "Fill The Field": "Fill The Field",
                "Fill Options at least 2": "Fill Options at least 2",
                "You cannot add more than 5": "You cannot add more than 5",
                "Transaction is failed!": "Transaction is failed!",
                "You must vote one item": "You must vote one item",
                "Voting Result": "Voting Result",
                "Wait for a moment": "Wait for a moment",
                "If your transaction is succeed, it will be refreshed.": "If your transaction is succeed, it will be refreshed.",
                "You have to install Nebulas Wallet": "You have to install Nebulas Wallet",
                "install": "install",
                "Refresh Now": "Refresh Now",
                "Search Voting": "Search Voting",
                "There is no voting": "There is no voting",
            }
        },
        zh: {
            translations: {
                "Enroll Your Voting": "请注册您的投票",
                "Author": "作者",
                "Title": "主题",
                "Vote": "表决",
                "Result": "结果",
                "Delete": "删除",
                "Voter": "选民",
                "Voters": "选民",
                "Cancel": "取消",
                "Enroll": "注册",
                "Close": "关",
                "Fill The Field": "填写所有字段",
                "Fill Options at least 2": "填写选项至少两个",
                "You cannot add more than 5": "不能添加超过5个",
                "Transaction is failed!": "交易失败!",
                "You must vote one item": "您必须对一件物品进行投票",
                "Voting Result": "投票结果",
                "Wait for a moment": "请稍等一下",
                "If your transaction is succeed, it will be refreshed.": "如果您的交易成功，它将被刷新。",
                "You have to install Nebulas Wallet": "您必须安装Nebulas钱包",
                "install": "安装",
                "Refresh Now": "立即刷新",
                "Search Voting": "搜索投票",
                "There is no voting": "没有投票权",
            }
        },
        ko: {
            translations: {
                "Enroll Your Voting": "투표를 등록하세요",
                "Author": "글쓴이",
                "Title": "제목",
                "Vote": "투표",
                "Result": "결과",
                "Delete": "삭제",
                "Voter": "명 참여",
                "Voters": "명 참여",
                "Cancel": "취소",
                "Enroll": "등록",
                "Close": "닫기",
                "Fill The Field": "채우지 않은 입력값이 있습니다",
                "Fill Options at least 2": "선택값이 적어도 두 개 이상은 있어야 합니다",
                "You cannot add more than 5": "5개보다 많게는 추가할 수 없습니다",
                "Transaction is failed!": "트랜잭션 전송이 실패했습니다!",
                "You must vote one item": "한 항목에는 투표해야 합니다",
                "Voting Result": "투표 결과",
                "Wait for a moment": "잠시만 기다려주세요",
                "If your transaction is succeed, it will be refreshed.": "트랜잭션이 성공하면 새로고침됩니다.",
                "You have to install Nebulas Wallet": "네뷸러스 지갑을 설치해야 합니다",
                "install": "설치",
                "Refresh Now": "지금 새로고침하기",
                "Search Voting": "투표 검색",
                "There is no voting": "투표가 없습니다",
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
