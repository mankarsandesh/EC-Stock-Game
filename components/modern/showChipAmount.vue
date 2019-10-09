<template>
  <div>
    <v-img v-show="amount>0" :width="size" src="/chip/black.png" class="show-chip">
      <span>{{amount}}</span>
    </v-img>
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
  }
};
</script>
<style  scoped>
.show-chip {
  position: absolute;
}
</style>