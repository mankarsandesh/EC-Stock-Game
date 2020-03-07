require('dotenv');

const config = {
    version: "1",
    header: {
        authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
    },
    getStock: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/getStock"
    },
    getAllBets: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/getAllBets"
    },
    updateUserProfile: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/updateUserProfile"
    },
    getUserProfile: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/getUserProfile"
    },
    updateUserSetting: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/updateUserSetting"
    },
    getRoadMap: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/getRoadMap"
    },
    storeBet: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/storeBet"
    },
    sendMessage: {
        url: "http://uattesting.equitycapitalgaming.com/webApi/messages/send"
    }
};

export default config;