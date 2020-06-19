import Echo from "laravel-echo";
import config from "../config/config.global";

export default async ({ store, $axios }) => {
  const port = 6001;

  window.io = require("socket.io-client");
  window.Pusher = require("pusher-js");

  // Get active games by category (api)
  try {
    var reqBody = {
      portalProviderUUID: store.getters.getPortalProviderUUID,
      userUUID : store.getters.getUserUUID,
      version: config.version
    };
    var { data } = await $axios.post(
      config.getActiveGamesByCategory.url,
      reqBody,
      { headers: config.header }
    );
    // Set stock category in vuex store
    store.dispatch("setStockCategory", data.data);
  } catch (ex) {
    console.log(ex);
  }

  if (typeof io !== "undefined") {
    // connect to web socket
    try {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: config.secretKey, 
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
  // Get stock list countdown(socket)
  listenStock(
    {
      channelName: `countdown.${store.getters.getPortalProviderUUID}`,
      eventName: "countdown"
    },
    ({ data }) => {
      try {      
        if (data.status) {
          store.dispatch("setStockCountdown", data.data.timeData);
        } else {
          throw new Error(window.$nuxt.$root.$t("error.general"));
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
  // Get active games by category(socket)
  listenStock(
    {
      channelName: `getActiveGamesByCategory.${store.getters.getPortalProviderUUID}`,
      eventName: "getActiveGamesByCategory"
    },
    ({ data }) => {
      try {      
        if (data.res.status) {         
          store.dispatch("setStockCategory", data.res.data);
        } else {
          throw new Error(window.$nuxt.$root.$t("error.general"));
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
  // Get Stock list price(socket)
  listenStock(
    {
      channelName: `stockListOnly.${store.getters.getPortalProviderUUID}`,
      eventName: "stockListOnly"
    },
    ({ data }) => {
      try {       
        if (data.status) {
          store.dispatch("setStockPrice", data.data.stockData);
        } else {
          throw new Error(window.$nuxt.$root.$t("error.general"));
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
};
