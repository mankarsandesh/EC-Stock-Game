import Echo from "laravel-echo";
export default ({ store }) => {
  const hostName = "uattesting.equitycapitalgaming.com";
  const port = 6001;

  window.io = require("socket.io-client");
  window.Pusher = require("pusher-js");

  if (typeof io !== "undefined") {
    try {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "CC21128A312FAF7817C93D1B51CB9", // SERVER_KEY = CC21128A312FAF7817C93D1B51CB9 ,Local Key = 6E591671FA45AE32B4AC2CB5BFA69
        wsHost: hostName,
        wsPort: port,
        disableStats: true,
        auth: {
          headers: {
            Authorization: "Basic dG5rc3VwZXI6VGVzdDEyMyEs="
          }
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
      console.log(data);
      store.commit("setStockListTimer", data.data.stockData);
    }
  );
};
