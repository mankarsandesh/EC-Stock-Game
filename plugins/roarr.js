import config from "../config/config.global";

export default context => {
  // Global Roarr function
  window.ROARR = window.ROARR || {};

  // Send log to the server
  window.ROARR.write = message => {
    context.$axios
      .post(config.logDomain, JSON.parse(message))
      .then(done => {})
      .catch(e => console.log(e));
  };
};
