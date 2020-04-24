const config = {
  version: "1",
  authUser: `${process.env.AUTH_USER}`,
  authPassword: `${process.env.AUTH_PASS}`,
  apiDomain: process.env.API_DOMAIN,
  socketUrl: process.env.SOCKET_URL,
  baseUrl: process.env.BASE_URL,
  secretKey: "CC21128A312FAF7817C93D1B51CB9",
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
  getUserInvitation: {
    url: `${process.env.BASE_URL}/sendInvitation`
  },
  getVisitUserProfile: {
    url: `${process.env.BASE_URL}/visitUserProfile`
  },
  getUserFollower: {
    url: `${process.env.BASE_URL}/followUserList`
  },
  serverConfig: {
    port: 8000,
    host: "0.0.0.0"
  },
  error: {
    general: "Something went wrong!"
  },
  loginError: {
    portalProvider: "Portal Provider UUID is invalid",
    portalProviderUserID: "Portal Provider User Id is invalid",
    balance: "Balance is invalid",
    authError: "Authentication authUser & authPassword is Missing."
  },
  logDomain: process.env.LOG_DOMAIN || "http://127.0.0.1:3003/log",
  defaultLanguageLocale: "cn",
  defaultCoinsModern: ["100", "500", "1000", "5000", "10000"],
  homePageStockName: "btc1"
};

export default config;
