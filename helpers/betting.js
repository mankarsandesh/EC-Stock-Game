import secureStorage from '~/plugins/secure-storage'

class Betting {
    /**
     *
     *
     * @param {*} items
     * @memberof Betting
     */
    cancelBettingClear(items) {

        if (items.length) {

            items.map(item => {

                $("#" + item.id.split("-")[0]).removeClass(item.class)

                if ($("#" + item.id).hasClass(item.class)) {

                    secureStorage.removeItem("itemBetting")

                    $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])

                }
            })

        }

    }

}
export default Betting = new Betting