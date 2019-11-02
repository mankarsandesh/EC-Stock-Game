<template>
  <div>
    <h4>
      {{$t('home.welcome')}}
      <span class="warning--text">{{getUserName}},</span>
      <span class="warning--text">${{getBalance}}</span>
      {{$t('home.goodluck')}}！！
    </h4>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters([
            "getBalance",
            "getUserName"
        ])
    }
}
</script>