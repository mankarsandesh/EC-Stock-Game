import secureStorage from "~/plugins/secure-storage";

class Result {
    constructor() {
        const itembBetting = []
    }
    setItemBetting() {

        const getItem = secureStorage.getItem("itemsBetting")

        if (getItem) {

            const keys = Object.values(getItem)

            keys.map((item, index) => {

                if (!$("#" + item.id).hasClass(item.class + ' ' + item.id.split("-")[1])) {

                    $("#" + item.id).addClass(item.class + ' ' + item.id.split("-")[1])

                }
            })
        }
    }

}
export default Result = new Result