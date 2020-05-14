<template>
  <div class="flex-container" v-if="items.length > 0">
    <div class="selected-container" @click="menuShow = !menuShow">
      <span v-if="select.length === 0" class="pl-2">
        {{ label }}
      </span>
      <span v-else class="item-select" v-for="item in select" :key="item">
        {{ item }}
      </span>
      <span class="icon-select">
        <v-icon color="#fff">fa-chevron-down</v-icon>
      </span>
    </div>
    <div>
      <div class="select-content" v-if="menuShow">
        <v-card>
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
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
  data: () => ({
    label: "select category",
    menuShow: false,
    select: []
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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.selected-container {
  cursor: pointer;
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-right: #fff solid 1px;
}
.item-select {
  padding: 5px 10px;
  line-height: 35px;
  background-color: antiquewhite;
  margin: 5px;
  border-radius: 10px;
}
.select-content {
  background-color: #fff;
  width: 100%;
  position: absolute;
  min-height: 50px;
  overflow-y: auto;
}
.item-available {
  display: flex;
  align-items: center;
  padding: 5px 25px;
  cursor: pointer;
}
.item-available:first-child {
  padding-top: 5px;
}
.item-available:hover {
  background-color: aliceblue;
}
.item-available > label {
  padding-left: 10px;
}
.icon-select {
  position: absolute;
  right: 12px;
}
</style>
