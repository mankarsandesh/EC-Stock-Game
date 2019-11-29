export default function ({ isHMR, app, store, route, error, redirect }) {
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) { return }
    
    // If middleware is called from hot module replacement, ignore it
    if (route.path ==="/") {
       return
    }

    // if (!store.getters.checkAuth) {
    //     // call Api to show in chart and store it in Vuex

    //     // redirect to whitelabel
    //     app.router.push('/')
    // }
}