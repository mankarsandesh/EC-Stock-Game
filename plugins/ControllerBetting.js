export default ({ app, isHMR, store, route, error, redirect }, inject) => {

    inject('StoreBettingonConfirm', async(items) => {
        try {
            store.dispatch("setTempMultiGameBetData", items)
        } catch (error) {
            console.log(error)
        }
    })


}