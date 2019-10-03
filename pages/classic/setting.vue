<template>
<div>
    <button @click="reserDefault()">resetDateChip</button>
    <button @click="upDateChip()">upDateChip</button><br>

    <v-avatar size="80" v-for="(chip,key) in chips" :key="key">
        <v-img :src="chip.img">
            <input :readonly="readonly" type="number" :style="chip.title !== 'black' ? 'color :black': 'color :white'" class="btn-setchips" :value="chip.price">
        </v-img>

    </v-avatar>

</div>
</template>

<script>
export default {
    data() {
        return {
            chips: [{
                    "title": "Danger",
                    "img": "/chip/danger.png",
                    "price": "100000"
                },
                {
                    "title": "Primary",
                    "img": "/chip/primary.png",
                    "price": "50"
                },
                {
                    "title": "success",
                    "img": "/chip/success.png",
                    "price": "100"
                },
                {
                    "title": "yellow ",
                    "img": "/chip/yellow.png",
                    "price": "500"
                },
                {
                    "title": "warning",
                    "img": "/chip/warning.png",
                    "price": "1000"
                }, {
                    "title": "black",
                    "img": "/chip/black.png",
                    "price": "5000"
                }
            ]
        }
    },
    // watch() {
    //     this.chips = localStorage.chips
    // },
    mounted() {
        this.chips = JSON.parse(localStorage.chips)
    },
    methods: {
        upDateChip() {
            this.chips = localStorage.chips = JSON.stringify([{
                    "title": "Danger",
                    "img": "/chip/danger.png",
                    "price": "100000"
                },
                {
                    "title": "Primary",
                    "img": "/chip/primary.png",
                    "price": "50"
                },
                {
                    "title": "success",
                    "img": "/chip/success.png",
                    "price": "100"
                },
                {
                    "title": "yellow ",
                    "img": "/chip/yellow.png",
                    "price": "500"
                },
                {
                    "title": "warning",
                    "img": "/chip/warning.png",
                    "price": "1000"
                }, {
                    "title": "black",
                    "img": "/chip/black.png",
                    "price": "5000"
                }
            ])
            this.chips = JSON.parse(localStorage.chips)
        },
        reserDefault() {
            this.chips = localStorage.chips = JSON.stringify([{
                    "title": "Danger",
                    "img": "/chip/danger.png",
                    "price": "10"
                },
                {
                    "title": "Primary",
                    "img": "/chip/primary.png",
                    "price": "50"
                },
                {
                    "title": "success",
                    "img": "/chip/success.png",
                    "price": "100"
                },
                {
                    "title": "yellow ",
                    "img": "/chip/yellow.png",
                    "price": "500"
                },
                {
                    "title": "warning",
                    "img": "/chip/warning.png",
                    "price": "1000"
                }, {
                    "title": "black",
                    "img": "/chip/black.png",
                    "price": "5000"
                }
            ])
            this.chips = JSON.parse(localStorage.chips)
        }
    }
}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btn-setchips {
    top: 36%;
    position: relative;
    text-align: center;
    width: 64%;
    /* background-color: yellowgreen; */
}
</style>
