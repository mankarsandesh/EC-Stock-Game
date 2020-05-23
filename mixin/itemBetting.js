import secureStorage from '~/plugins/secure-storage'
export const itemBetting = {

    mounted() {
        this.findItemBetting()
    },

    methods: {

        /**
         *
         * find the betting after user refresh page during game
         *
         */
        findItemBetting() {

            const itemBetting = secureStorage.getItem("itemBetting")

            if (itemBetting !== undefined && itemBetting !== null) {

                console.log('i am mixin typeof', typeof itemBetting)

                const keys = Object.values(itemBetting)

                keys.map((item, index) => {

                    console.log('i am item', item)

                    if (!$("#" + item.id).hasClass(item.class + ' ' + item.id.split("-")[1])) {

                        $("#" + item.id).addClass(item.class + ' ' + item.id.split("-")[1])

                    }
                })

            }

        },
    }
}