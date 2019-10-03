<template>
<div>
    <div style="
    padding:2%;
    text-align: center;
    background-color: #384e63;
">
    </div>
    <div style="
    margin-top: 3%;
    text-align: center;
">
        <v-avatar size="80" v-for="{title,img,price,index} in chips" :key="index">
            <v-img :src="img">
                <input :readonly="isShow != false ? readonly:''" type="number" min="10" max="10000" :style="title !== 'black' ? 'color :black': 'color :white'" class="btn-setchips" v-model="price">
            </v-img>
            <button class="btn-edit" @click="EditChip('Edit')" v-show="!isShow">Edit </button>
            <button class="btn-saves" @click="EditChip('Save'), changeChip(title, img, price)" v-show="isShow">Save</button>
        </v-avatar>
        <button @click="reserDefault()">resetDateChip</button>
        <button @click="changeChip()">upDateChip</button><br>
    </div>
</div>
</template>

<script>
import chips from './json/chips.json'
export default {
    data() {
        return {
            chipsReset: chips,
            chips: [],
            isShow: false
        }
    },
    mounted() {
        if (localStorage.chips == null) {
            localStorage.chips = JSON.stringify(this.chipsReset)
            this.chips = JSON.parse(localStorage.chips)
        } else {
            this.chips = JSON.parse(localStorage.chips)
        }

    },
    methods: {
        EditChip(val) {
            if (val == 'Edit')
                this.isShow = true
            else
                this.isShow = false
        },
        changeChip(title, img, price) {
            if (price < 10 || price > 10000 || price == null) {
                this.reserDefault()
                return
            }
            this.chips = JSON.parse(localStorage.chips)
            let index = this.chips.findIndex(x => x.title === title);
            if (index == -1) {
                this.chips.push({
                    title: title,
                    img: img,
                    price: price,
                });
            } else {
                this.chips[index].price = price;
            }
            localStorage.chips = JSON.stringify(this.chips)
        },
        reserDefault() {
            this.chips = localStorage.chips = JSON.stringify(this.chipsReset)
            this.chips = JSON.parse(localStorage.chips)
        }
    }
}
</script>

<style scoped>
input[type='number'] {
    -moz-appearance: textfield;
}

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

.btn-saves {
    top: 120%;
    position: absolute;
    text-align: center;
    width: 64%;
    margin-left: 0%;
    background-color: #ff0000;
    border-radius: 1rem;
    /* background-color: yellowgreen; */
}

.btn-edit {
    top: 120%;
    position: absolute;
    text-align: center;
    width: 64%;
    margin-left: 0%;
    background-color: #ff8f00;
    border-radius: 1rem;
    /* background-color: yellowgreen; */
}
</style>
