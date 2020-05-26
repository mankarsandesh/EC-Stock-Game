import secureStorage from '~/plugins/secure-storage'

class Betting {
    /**
     *
     *
     * @param {*} items
     * @memberof Betting
     */
    cancelBettingClear(items) {

        items.map(item => {

            if ($("#" + item.id).hasClass(item.class)) {

                localStorage.removeItem("itemBetting")

                $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])

            }
        })
    }

}
export default Betting = new Betting