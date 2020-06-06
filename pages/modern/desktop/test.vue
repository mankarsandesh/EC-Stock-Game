<template>
  <div class="flex-container">
    <div class="flex-left">
      444
    </div>
    <div class="flex-right">
      <div class="chart-container">
        5
      </div>
      <div class="s-container">
        <div class="row-flex">
          <div class="flex-column-button main-button">
            <div class="button-bet">
              <div class="content">
                <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                  <text x="30%" y="25%" :font-size="fontSize" fill="black">
                    first
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div class="flex-column-button bet-buttons">
            <div class="button-bet-9" v-for="n in 8" :key="n">
              <div class="content">
                <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                  <text x="30%" y="25%" :font-size="fontSize" fill="black">
                    big
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-column-button">
          <div class="row-flex">
            <div class="flex-column-button main-button">
              <div class="button-bet">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      last
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex-column-button  bet-buttons">
              <div class="button-bet-9" v-for="n in 8" :key="n">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      big
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-column-button">
          <div class="row-flex">
            <div class="flex-column-button main-button">
              <div class="button-bet">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      both
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex-column-button  bet-buttons">
              <div class="button-bet-10" v-for="n in 9" :key="n">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      big
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-column-button">
          <div class="row-flex">
            <div class="flex-column-button main-button">
              <div class="button-bet">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      two
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex-column-button  bet-buttons">
              <div class="button-bet-10" v-for="n in 9" :key="n">
                <div class="content">
                  <svg width="100%" height="100%" viewBox="0 -200 1000 300">
                    <text x="30%" y="25%" :font-size="fontSize" fill="black">
                      big
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "desktopModern",
  data() {
    return {
      odd: "Mac",
      fontSize: 150
    };
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  margin: 50px 250px;
  height: 100%;
}
.flex-left {
  flex-grow: 3;
  width: 20%;
  background-color: greenyellow;
}
.flex-right {
  flex-grow: 7;
  width: 80%;
  background-color: hotpink;
  display: flex;
}
.chart-container {
  flex-grow: 5;
  width: 40%;
}
.s-container {
  flex-grow: 5;
  width: 60%;
}
.flex-column-button {
  display: flex;
  position: relative;
}
div.button-bet {
  flex-grow: 2;
  background-color: ivory;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  width: 100%;
}
div.button-bet:before {
  content: "";
  display: block;
  padding-top: 100%;
}
div.button-bet-9 {
  flex-grow: 2;
  background-color: ivory;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  width: 20%;
}
div.button-bet-9:before {
  content: "";
  display: block;
  padding-top: 100%;
}
div.button-bet-10 {
  flex-grow: 2;
  background-color: blanchedalmond;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  width: 20%;
}

div.button-bet-10:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.row-flex {
  display: flex;
}
.main-button {
  flex-flow: 1;
  width: 11%;
}
.bet-buttons {
  flex-flow: 9;
  width: 89%;
}
</style>
