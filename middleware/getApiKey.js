export default function ({ isHMR, app, store, route, error, redirect }) {
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) { return }

    const apiKey = route.query.apiKey
    if(!apiKey){
        location.href = "http://localhost:3000/" 
        return
    }
    store.commit("setAuth_token",apiKey)
   
}