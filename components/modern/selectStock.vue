<template>
  <div>
    <ul class="main-navigation">
      <li>
        <a href="#">Select Stock > {{getStockType(stockId)}} > {{ $t(`stockname.${stockId}`) }} > {{getLoop(stockId)}} Minute loop > 010620191007094101</a>
        <ul>
          <li>
            <a href="#">CYPTO</a>
            <ul>
              <li>
                <a href="#">BTC/USDT</a>
                <ul>
                  <li>
                    <a href="#">1 Minute loop</a>
                  </li>
                  <li>
                    <a href="#">5 Minute loop</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">CHINA</a>
            <ul>
              <li>
                <a href="#">SH000001</a>
                <ul>
                  <li>
                    <a href="#">5 Minute loop</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">SZ399001</a>
                <ul>
                  <li>
                    <a href="#">5 Minute loop</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">SZ399415</a>
                <ul>
                  <li>
                    <a href="#">5 Minute loop</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">SH00300</a>
                <ul>
                  <li>
                    <a href="#">5 Minute loop</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">USA</a>
            <ul>
              <li>
                <a href="#">US Dollar Index</a>
                <ul>
                  <li>
                    <a href="#">5 Minute loop</a>
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
import {mapGetters} from 'vuex'
export default {
    props:{
        stockId:{
            type:String,
            required:true
        }
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters([
            "getLoop",
            "getStockType"
        ])
    }
}
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
