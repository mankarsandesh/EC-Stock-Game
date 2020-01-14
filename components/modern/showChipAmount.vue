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
                }, 500);
                this.setsrc = val <= 100 ? '/chip/danger.png' :
                    val <= 500 ? '/chip/primary.png' :
                    val <= 1000 ? '/chip/success.png' :
                    val <= 5000 ? '/chip/warning.png' :
                    '/chip/black.png'
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
