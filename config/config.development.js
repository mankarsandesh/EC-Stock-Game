const config = {
  version: "1",
  authUser : `${process.env.AUTHUSER}`,
  authPassword : `${process.env.AUTHPASS}`,
  apiDomain: process.env.API_DOMIAN,
  secretKey:"CC21128A312FAF7817C93D1B51CB9",
  header: {
    authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
  },
  userLoginAuth: {
    url: `${process.env.BASE_URL}/webUserLogin`
  },
  getStock: {
    url: `${process.env.BASE_URL}/getStock`
  },
  getAllStock: {
    url: `${process.env.BASE_URL}/getAllStock`
  },
  getAllBets: {
    url: `${process.env.BASE_URL}/getAllBets`
  },
  updateUserProfile: {
    url: `${process.env.BASE_URL}/updateUserProfile`
  },
  getUserProfile: {
    url: `${process.env.BASE_URL}/getUserProfile`
  },
  updateUserSetting: {
    url: `${process.env.BASE_URL}/updateUserSetting`
  },
  getRoadMap: {
    url: `${process.env.BASE_URL}/getRoadMap`
  },
  storeBet: {
    url: `${process.env.BASE_URL}/storeBet`
  },
  sendMessage: {
    url: `${process.env.BASE_URL}/messages/send`
  },
  getActiveGamesByCategory: {
    url: `${process.env.BASE_URL}/getActiveGamesByCategory`
  },
  getAllAnnouncements: {
    url: `${process.env.BASE_URL}/getAllAnnouncements`
  },
  followUser: {
    url: `${process.env.BASE_URL}/followUser`
  },
  getLeaderBoard: {
    url: `${process.env.BASE_URL}/getLeaderBoard`
  },
  getUserBetAnalysis: {
    url: `${process.env.BASE_URL}/getUserBetAnalysis`
  },
  serverConfig: {
    port: 8000,
    host: "0.0.0.0"
  },
  // loggly: {
  //   token: '852204e4-2752-4d9c-9b1c-f9f2152c2f40',
  //   subdomain: 'localhost',
  //   tags: ["Winston-VueJs"]
  // }

};

export default config;
