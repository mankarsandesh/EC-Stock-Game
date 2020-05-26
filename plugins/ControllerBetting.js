export default ({ app, isHMR, store, route, error, redirect }, inject) => {

    inject('CheckingBetting', (number1, number2) => {
        console.log("This is the value string", typeof number1)
        console.log("This is the value string", typeof number2)
        console.log("This is the value form vuex", store.getters.getFooterBetAmount)
    })


}