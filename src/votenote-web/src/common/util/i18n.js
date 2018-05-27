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
                "Voter": "투표자",
                "Voters": "투표자들",
                "Cancel": "취소",
                "Enroll": "등록",
                "Close": "닫기",
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
