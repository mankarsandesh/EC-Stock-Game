<template>
  <div>
    <ul class="main-navigation">
      <li>
        <a
          href="#"
        >
        <span v-if="isMultigame" class="text-uppercase">
          select a stock here to add more  
        </span>
        <span v-else >
          Select Stock > {{getStockType(stockId)}} > {{ $t(`stockname.${stockId}`) }} > {{getLoop(stockId)}} Minute loop > 010620191007094101
        </span>
        </a>
        <ul>
          <li v-for="(stockType,index) in stockData" :key="index">
            <a href="#">{{stockType.type}}</a>
            <ul>
              <li v-for="stockName in stockType.stockName" :key="stockName">
                <a href="#">{{stockName.name}}</a>
                <ul>
                  <li v-for="stockLoop in stockName.loop" :key="stockLoop">
                    <nuxt-link to="/modern/desktop/btc1">{{stockLoop.loop}} Minute loop</nuxt-link>
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
import { mapGetters } from "vuex";
export default {
  props: {
    isMultigame:{
      type:Boolean,
      default:false
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
                  loop: 1
                },
                {
                  loop: 5
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
                  loop: 5
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
                  loop: 5
                }
              ]
            },
            {
              name: "SZ399001",
              loop: [
                {
                  loop: 5
                }
              ]
            },
            {
              name: "SZ399415",
              loop: [
                {
                  loop: 5
                }
              ]
            },
            {
              name: "SH00300",
              loop: [
                {
                  loop: 5
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
    ...mapGetters(["getLoop", "getStockType"])
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
