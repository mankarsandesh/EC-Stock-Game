import Echo from "laravel-echo";
import config from "../config/config.global";
import axios from "axios";

export default async ({ store }) => {
  const port = 6001;

  window.io = require("socket.io-client");
  window.Pusher = require("pusher-js");

  try {
    var reqBody = {
      portalProviderUUID: store.getters.getPortalProviderUUID,
      version: config.version
    };
    var { data } = await axios.post(
      config.getActiveGamesByCategory.url,
      reqBody,
      { headers: config.header }
    );
    store.dispatch("setStockCategory", data.data);
  } catch (ex) {
    console.log(ex);
  }

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
      try {
        var logData = data;
        if (data.status) {
          store.dispatch("setStockCountdown", data.data.timeData);
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
  // Get active games by category
  listenStock(
    {
      channelName: `getActiveGamesByCategory.${store.getters.getPortalProviderUUID}`,
      eventName: "getActiveGamesByCategory"
    },
    ({ data }) => {
      try {
        var logData = data.res;
        if (data.res.status) {
          store.dispatch("setStockCategory", data.res.data);
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
  // Get Stock list price
  listenStock(
    {
      channelName: `stockListOnly.${store.getters.getPortalProviderUUID}`,
      eventName: "stockListOnly"
    },
    ({ data }) => {
      try {
        var logData = data.data;
        if (data.status) {
          store.dispatch("setStockPrice", data.data.stockData);
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
};
