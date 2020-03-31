import Echo from "laravel-echo";
import config from "../config/config.global";
export default ({ store }) => {
  const port = 6001;

  window.io = require("socket.io-client");
  window.Pusher = require("pusher-js");

  if (typeof io !== "undefined") {
    // connect to web socket
    try {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: config.secretKey, // check on Config File.
        wsHost: config.socketUrl,
        wsPort: port,
        disableStats: true,
        auth: {
          headers: config.header
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  function listenForBroadcast({ channelName, eventName }, callback) {
    window.Echo.channel(channelName).listen(eventName, callback);
  }
  // start listening socket stock live price
  listenForBroadcast(
    {
      channelName: `stockList.${store.getters.getPortalProviderUUID}`,
      eventName: "stockList"
    },
    ({ data }) => {
      store.commit("setStockListTimer", data.data.stockData);
    }
  );

  // get the stock category
  function listenStock({ channelName, eventName }, callback) {
    window.Echo.channel(channelName).listen(eventName, callback);
  }
  listenStock(
    {
      channelName: `getActiveGamesByCategory.${store.getters.getPortalProviderUUID}`,
      eventName: "getActiveGamesByCategory"
    },
    ({ data }) => {
      store.commit("SET_STOCK_CATEGORY", data.res.data);
    }
  );
};
