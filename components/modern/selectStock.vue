<template>
  <div>
    <ul class="main-navigation">
      <li>
        <a href="#">
          <span v-if="isMultigame" class="text-uppercase">select a stock here to add more</span>
          <span v-else>
            Select Stock > {{getStockType(stockId)}} > {{ $t(`stockname.${stockId}`) }} > {{getLoop(stockId)}} Minute loop > 010620191007094101
            <span
              style="margin-left: 100px;"
            >
              <i class="fa fa-caret-down"></i>
            </span>
          </span>
        </a>
        <ul>
          <li v-for="(stockType,index) in stockData" :key="index">
            <a href="#">
              <span>{{stockType.type}}</span>
              <span style="margin-left: 34px;">
                <i class="fa fa-caret-right"></i>
              </span>
            </a>
            <ul>
              <li v-for="stockName in stockType.stockName" :key="stockName">
                <a href="#">
                  <span>{{stockName.name}}</span>
                  <span style="margin-left: 34px;">
                    <i class="fa fa-caret-right"></i>
                  </span>
                </a>
                <ul>
                  <li v-for="stockLoop in stockName.loop" :key="stockLoop">
                    <span>
                      <a
                        href="#"
                        :style="checkMultigameExistAndDisable(stockLoop.stockId)"
                        @click="selectedtockID(stockLoop.stockId)"
                      >
                        <span>{{stockLoop.loop}} Minute loop</span>
                        <span
                          style="margin-left: 31px;"
                          v-show="checkMultigameExistAndShowIcon(stockLoop.stockId)"
                        >
                          <i class="fa fa-check"></i>
                        </span>
                      </a>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    isMultigame: {
      type: Boolean,
      default: false
    },
    stockId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stockData: [
        {
          type: "crypto",
          stockName: [
            {
              name: "btc",
              loop: [
                {
                  loop: 1,
                  stockId: "btc1"
                },
                {
                  loop: 5,
                  stockId: "btc5"
                }
              ]
            }
          ]
        },
        {
          type: "usa",
          stockName: [
            {
              name: "usindex",
              loop: [
                {
                  loop: 5,
                  stockId: "usindex"
                }
              ]
            }
          ]
        },
        {
          type: "china",
          stockName: [
            {
              name: "SH000001",
              loop: [
                {
                  loop: 5,
                  stockId: "SH000001"
                }
              ]
            },
            {
              name: "SZ399001",
              loop: [
                {
                  loop: 5,
                  stockId: "SZ399001"
                }
              ]
            },
            {
              name: "SZ399415",
              loop: [
                {
                  loop: 5,
                  stockId: "SZ399415"
                }
              ]
            },
            {
              name: "SH00300",
              loop: [
                {
                  loop: 5,
                  stockId: "SH00300"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    // alert(this.stockData[0]);
  },

  computed: {
    ...mapGetters([
      "getLoop",
      "getStockType",
      "checkMultigameExistAndDisable",
      "checkMultigameExistAndShowIcon"
    ])
  },
  methods: {
    ...mapMutations(["addStockMultigame"]),
    selectedtockID(stockId) {
      if (this.isMultigame) {
        this.addStockMultigame(stockId);
      } else {
        this.$router.push(`/modern/desktop/${stockId}`);
      }
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #003e70;
}

ul li {
  display: block;
  position: relative;
  float: left;
  background: #003e70;
}

li ul {
  display: none;
  min-width: 150px;
}

ul li a {
  display: block;
  padding: 0.6em;
  text-decoration: none;
  white-space: nowrap;
  color: #fff;
}

ul li a:hover {
  background: #003e70;
}

li:hover > ul {
  display: block;
  position: absolute;
}

li:hover li {
  float: none;
}

li:hover a {
  background: #003e70;
}

li:hover li a:hover {
  background: #1b405f;
}

.main-navigation li ul li {
  border-top: 0;
  z-index: 2000;
}

ul ul ul {
  left: 100%;
  top: 0;
}
ul:before,
ul:after {
  content: " "; /* 1 */
  display: table; /* 2 */
}

ul:after {
  clear: both;
}
</style>
