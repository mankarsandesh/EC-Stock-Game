import config from "../config/config.global";

export default context => {
  // Global Roarr function
  globalThis.ROARR = globalThis.ROARR || {};

  // Send log to the server
  globalThis.ROARR.write = message => {
    context.$axios
      .post(config.logDomain, JSON.parse(message))
      .then(done => {})
      .catch(e => console.log(e));
  };
};
