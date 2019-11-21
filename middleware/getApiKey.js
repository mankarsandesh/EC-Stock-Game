export default function({ isHMR, app, store, route, error, redirect }) {
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) { return }

    const apiKey = route.query.apiKey
    if (!apiKey) {
        location.href = "http://" + location.hostname + ":8001/"
        return
    }
    store.commit("setAuth_token", apiKey)
    store.dispatch("asynInitCallApi")
}