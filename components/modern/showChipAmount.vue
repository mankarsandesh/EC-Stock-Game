<template>
<div>
    <v-img v-show="isShow" :src="setsrc" :width="size" class="show-chip">
        <span>{{amount}}</span>
    </v-img>
    <!-- <v-img v-show="amounts > 0 " src="/chip/danger.png'" width="20" class="show-chip" />
    <v-img v-show="amounts >=500" src="/chip/primary.png" width="25" class="show-chip" />
    <v-img v-show="amounts >=1000" src="/chip/success.png" width="30" class="show-chip" />
    <v-img v-show="amounts >=5000" src="/chip/warning.png" width="35" class="show-chip" />
    <v-img v-show="amounts >=10000" src="/chip/black.png" width="40" class="show-chip" /> -->
</div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isShow: false,
            setsrc: '',
            amounts: ""
        }
    },
    watch: {
        amount(val) {
            // this.amounts = val
            if (val > 0) {
                this.isShow = false
                setTimeout(() => {
                    this.isShow = true
                },10);
                this.setsrc = val <= 100 ? '/showChips/chip100.png' :
                    val <= 200 ? '/showChips/chip200.png' :
                    val <= 300 ? '/showChips/chip300.png' :
                    val <= 400 ? '/showChips/chip400.png' :
                    val <= 500 ? '/showChips/chip500.png' :
                    val <= 600 ? '/showChips/chip600.png' :
                    val <= 700 ? '/showChips/chip700.png' :
                    val <= 800 ? '/showChips/chip800.png' :
                    val <= 900 ? '/showChips/chip900.png' :
                    val <= 1000 ? '/showChips/chip1000.png' :
                    val <= 1100 ? '/showChips/chip1100.png' :
                    val <= 1200 ? '/showChips/chip1200.png' :
                    val <= 1300 ? '/showChips/chip1300.png' :
                    val <= 1400 ? '/showChips/chip1400.png' :
                    val <= 1500 ? '/showChips/chip1500.png' :
                    val <= 1600 ? '/showChips/chip1600.png' :
                    val <= 1700 ? '/showChips/chip1700.png' :
                    val <= 1800 ? '/showChips/chip1800.png' :
                    val <= 1900 ? '/showChips/chip1900.png' :
                    val <= 2000 ? '/showChips/chip2000.png' :
                    val <= 2500 ? '/showChips/chip2500.png' :
                    val <= 3000 ? '/showChips/chip3000.png' :
                    val <= 3500 ? '/showChips/chip3500.png' :
                    val <= 4000 ? '/showChips/chip4000.png' :
                    val <= 4500 ? '/showChips/chip4500.png' :
                    val <= 5000 ? '/showChips/chip5000.png' :
                    val <= 10000 ? '/showChips/chip10000.png':
                    '/showChips/chipbig.png'

            } else {
                this.isShow = false
            }
        }
    }
};
</script>

<style>
.show-chip {
    position: absolute;

}

.v-responsive__content {
    align-self: center !important;
    font-size: 12px;
}
</style>
