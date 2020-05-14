<template>
  <div class="flex-container">
    <div class="selected-container" @click="menuShow = !menuShow">
      <span v-if="select.length === 0">
        {{ label }}
      </span>
      <span v-else class="item-select" v-for="item in select" :key="item">
        {{ item }}
      </span>
      <span class="icon-select">
        <v-icon>fa-chevron-down</v-icon>
      </span>
    </div>
    <v-card v-if="menuShow">
      <div class="select-content">
        <div
          class="item-available"
          v-for="item in items"
          :key="item"
          @click="selectClick(item.title)"
        >
          <input v-if="select.includes(item.title)" type="checkbox" checked />
          <input v-else type="checkbox" />
          <label>{{ item.title }}</label>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    label: "select category",
    menuShow: false,
    select: [],
    items: [
      { title: "macky" },
      { title: "vong" },
      { title: "bank" },
      { title: "tay" }
    ]
  }),
  mounted() {
    this.label = this.label.toUpperCase();
  },
  methods: {
    selectClick(value) {
      if (!this.select.includes(value)) {
        this.select.push(value);
      } else {
        this.select.splice(
          this.select.findIndex(item => item.title === value),
          1
        );
      }
    }
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
}
.selected-container {
  cursor: pointer;
  width: 100%;
  background-color: gray;
  height: 35px;
  line-height: 35px;
}
.item-select {
  padding: 5px 10px;
  line-height: 35px;
  background-color: antiquewhite;
  margin: 5px;
  border-radius: 10px;
}
.select-content {
  padding: 10px;
  min-height: 50px;
}
.item-available {
  display: flex;
  align-items: center;
  padding: 10px;
}
.item-available > label {
  padding-left: 10px;
}
.icon-select {
  position: absolute;
  right: 12px;
}
</style>
