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
<style  >
.show-chip {
  position: absolute;


}
.v-responsive__content {
    align-self: center !important;
    font-size: 12px;
}

</style>