<template>
  <div class="flex-container" v-if="items.length > 0">
    <div class="selected-container" @click="menuShow = !menuShow">
      <span v-if="select.length === 0" class="pl-2">
        {{ label }}
      </span>
      <span v-else class="item-select" v-for="item in select" :key="item.title">
        {{ item.title }}
      </span>
      <span class="icon-select">
        <v-icon color="#fff">keyboard_arrow_down</v-icon>
      </span>
    </div>
    <v-card>
      <div class="select-content" v-if="menuShow" v-on-clickaway="closeMenu">
        <div
          class="item-available"
          v-for="item in items"
          :key="item.title"
          @click="selectClick(item)"
        >
          <v-checkbox
            :off-icon="
              select.includes(item) ? 'check_box' : 'check_box_outline_blank'
            "
            :on-icon="
              select.includes(item) ? 'check_box' : 'check_box_outline_blank'
            "
            readonly
            class="ma-2"
            hide-details
            color="black"
            :label="item.title"
          ></v-checkbox>
          <!-- <label class="cursor-pointer">{{ item.title }}</label> -->
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
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
    closeMenu() {
      this.menuShow = false;
    },
    selectClick(object) {
      if (!this.select.includes(object)) {
        this.select.push(object);
      } else {
        this.select.splice(
          this.select.findIndex(
            item => item.title.toLowerCase() === object.title.toLowerCase()
          ),
          1
        );
      }
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
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
  overflow-y: auto;
  top: -35px;
  min-height: 100px;
}
.item-available {
  display: flex;
  align-items: center;
  padding: 0px 25px;
  cursor: pointer;
}
.item-available:hover {
  background-color: aliceblue;
}

.icon-select {
  position: absolute;
  right: 12px;
}
</style>
