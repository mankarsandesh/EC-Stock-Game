export default function({ isHMR, app, store, route, error, redirect }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  const apiKey = (localStorage.apikey = route.query.apiKey);
  if (!apiKey) {
    // location.href = "http://whitelabelv2.herokuapp.com"
    // location.href = "http://" + location.hostname + ":8001"
    return;
  }
  store.dispatch("setAuthToken", apiKey);
  store.dispatch("setUserData");
}
