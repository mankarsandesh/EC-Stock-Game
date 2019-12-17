<template>
<div>
    <h4>
        {{$t('home.welcome')}}
        <span class="warning--text">{{getUserName.name}},</span>
        <span class="warning--text">{{formatToPrice(getBalance)}}</span>
        {{$t('home.goodluck')}}！！
    </h4>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            "getBalance",
            "getUserName"
        ])
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },

    },
}
</script>
