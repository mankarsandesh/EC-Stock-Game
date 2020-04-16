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

  function listenStock({ channelName, eventName }, callback) {
    window.Echo.channel(channelName).listen(eventName, callback);
  }
  // Get stock list countdown
  listenStock(
    {
      channelName: `countdown.${store.getters.getPortalProviderUUID}`,
      eventName: "countdown"
    },
    ({ data }) => {
      store.dispatch("setStockCountdown", data.data.timeData);
    }
  );
  // Get active games by category
  listenStock(
    {
      channelName: `getActiveGamesByCategory.${store.getters.getPortalProviderUUID}`,
      eventName: "getActiveGamesByCategory"
    },
    ({ data }) => {
      store.dispatch("setStockCategory", data.res.data);
    }
  );
  // Get Stock list price
  listenStock(
    {
      channelName: `stockListOnly.${store.getters.getPortalProviderUUID}`,
      eventName: "stockListOnly"
    },
    ({ data }) => {
      store.dispatch("setStockPrice", data.data.stockData);
    }
  );
};
