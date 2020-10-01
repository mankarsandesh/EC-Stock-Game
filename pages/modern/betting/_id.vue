<template>
  <div>
    <v-layout>
      <!-- Last Draw Stock Game -->
      <lastDraw />
    </v-layout>

    <!-- bet buttons zone -->
    <v-layout row wrap class="container-bet" mt-2>
      <v-flex xs12 sm12 md12>
        <v-layout wrap xs12x>
          <v-flex v-if="checkBettingResult"></v-flex>
          <v-flex xs1 align-self-center class="text-xs-right">
            <v-icon
              style="font-size:40px;"
              color="#003e70"
              v-show="isShowTrendMap"
              @click="changeShowTrendMap()"
              >keyboard_arrow_left</v-icon
            >
          </v-flex>

          <v-flex v-if="isShowTrendMap" xs10 class="text-xs-center py-2">
            <tableTrendMapMobile
              :dataArray="getRoadMap"
              :trendType="trendType"
            />
          </v-flex>

          <v-flex v-else sm12 xs12 pa-2>
            <span>
              <h3 class="text-uppercase">
                {{ $t("stockName." + $route.params.id) }} /
                <span>
                  {{ getStockLoop(this.$route.params.id) }}
                  {{ $t("msg.minuteGame") }}
                </span>

                <span
                  v-show="!isShowTrendMap"
                  class="roadMap"
                  @click="changeShowTrendMap()"
                >
                  Road Map &nbsp;
                  <v-icon size="18px" class="roadMapIcon"
                    >fa fa-arrow-circle-o-right</v-icon
                  >
                </span>
              </h3>
              <span
                class="text-primary text-xs-center"
                v-if="getGameUUIDByStockName(this.$route.params.id)"
              >
                <b>{{ $t("msg.gameId") }} : </b>
                <span>{{ getGameUUIDByStockName(this.$route.params.id) }}</span>
              </span>
            </span>
            <v-flex sm12 xs12 class="chartDesgin">
              <v-layout pa-2>
                <v-flex
                  xs6
                  class="text-xs-left"
                  v-if="getStockLiveTime(this.stockID)"
                >
                  <span class="text-time">{{
                    getStockLiveTime(this.stockID).split(" ")[1]
                  }}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 class="text-xs-right">
                  <span
                    class="text-price"
                    v-if="getStockLivePrice(this.stockID)"
                  >
                    $ {{ getStockLivePrice(this.stockID) }}
                  </span>
                </v-flex>
              </v-layout>

              <chartMobile :stockName="$route.params.id"></chartMobile>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex style="background-color:rgb(242, 244, 255);">
        <v-layout wrap sm6>
          <div class="tab-menu-container">
            <div class="digit-type-container">
              <div
                class="btn-digit-type first-digit"
                @click="$refs.firstDigit.click()"
              >
                <span class="text-white">{{ $t("gamemsg.firstdigit") }}</span>
              </div>
              <div
                class="btn-digit-type last-digit"
                @click="$refs.lastDigit.click()"
              >
                <span class="text-white">{{ $t("gamemsg.lastdigit") }}</span>
              </div>
              <div
                class="btn-digit-type both-digit"
                @click="$refs.bothDigit.click()"
              >
                <span class="text-white">{{ $t("gamemsg.bothdigit") }}</span>
              </div>
              <div
                class="btn-digit-type two-digit"
                @click="$refs.twoDigit.click()"
              >
                <span class="text-white">{{ $t("gamemsg.twodigit") }}</span>
              </div>
            </div>
            <span class="active-tab-mark" :style="leftActive"></span>
          </div>

          <div
            sm12
            xs12
            class="betClose"
            :style="$vuetify.breakpoint.xs ? 'width: 100%;' : ' width: 100%;'"
            v-if="checkBetCloseMobile"
          >
            <p>{{ $t("msg.betClosed") }}</p>
          </div>

          <v-tabs
            grow
            centered
            style="width:100%;background-color: #f2f4ff;padding:0 !important;"
            @change="tabChanged($event)"
          >
            <v-tab v-show="false" ref="firstDigit">
              <span>{{ $t("gamemsg.firstdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="lastDigit">
              <span>{{ $t("gamemsg.lastdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="bothDigit">
              <span>{{ $t("gamemsg.bothdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="twoDigit">
              <span>{{ $t("gamemsg.twodigits") }}</span>
            </v-tab>

            <div xs12 class="multipleChips">
              <v-avatar
                class="ml-2"
                v-for="(item, key) in imgChip"
                :key="key"
                @click="setFooterBetAmount(getCoinsModern[key])"
              >
                <v-img
                  class="ma-2"
                  width="52px"
                  :src="item.img"
                  :alt="item.title"
                >
                  <span class="setpricechip">{{ getCoinsModern[key] }}</span>
                </v-img>
              </v-avatar>

              {{ formatToPrice(getFooterBetAmount) }}
              <span class="clearButton" @click="clearChipsAmount()">
                {{ $t("msg.clear") }}
              </span>
            </div>

            <!-- First Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[0].rule,
                      firstDigit[0].ruleid,
                      firstDigit[0].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="40px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>{{ payoutValue(firstDigit[0].payout) }}</span>
                  </v-card-title>
                </v-card>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[1].rule,
                      firstDigit[1].ruleid,
                      firstDigit[1].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>{{ payoutValue(firstDigit[1].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[2].rule,
                      firstDigit[2].ruleid,
                      firstDigit[2].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                    <span>{{ payoutValue(firstDigit[2].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[3].rule,
                      firstDigit[3].ruleid,
                      firstDigit[3].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                    <span>{{ payoutValue(firstDigit[3].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerderfirst = !drawerderfirst"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountBetSpecificNumber({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'firstdigit'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>0-9</h5>
                    <span>9.82</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[6].rule,
                      firstDigit[6].ruleid,
                      firstDigit[6].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>{{ payoutValue(firstDigit[6].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[5].rule,
                      firstDigit[5].ruleid,
                      firstDigit[5].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>{{ payoutValue(firstDigit[5].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[4].rule,
                      firstDigit[4].ruleid,
                      firstDigit[4].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>{{ payoutValue(firstDigit[4].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- First Digit -->

            <!-- last digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[0].rule,
                      lastDigit[0].ruleid,
                      lastDigit[0].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>{{ payoutValue(lastDigit[0].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[1].rule,
                      lastDigit[1].ruleid,
                      lastDigit[1].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>{{ payoutValue(lastDigit[1].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[2].rule,
                      lastDigit[2].ruleid,
                      lastDigit[2].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                    <span>{{ payoutValue(lastDigit[2].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[3].rule,
                      lastDigit[3].ruleid,
                      lastDigit[3].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                    <span>{{ payoutValue(lastDigit[3].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerderlast = !drawerderlast"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountBetSpecificNumber({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>0-9</h5>
                    <span>9.82</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[6].rule,
                      lastDigit[6].ruleid,
                      lastDigit[6].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>{{ payoutValue(lastDigit[6].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[5].rule,
                      lastDigit[5].ruleid,
                      lastDigit[5].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>{{ payoutValue(lastDigit[5].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[4].rule,
                      lastDigit[4].ruleid,
                      lastDigit[4].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: lastDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>{{ payoutValue(lastDigit[4].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- last digit -->

            <!-- Both Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[2].rule,
                      bothDigit[2].ruleid,
                      bothDigit[2].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>{{ payoutValue(bothDigit[2].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[1].rule,
                      bothDigit[1].ruleid,
                      bothDigit[1].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>{{ payoutValue(bothDigit[1].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[0].rule,
                      bothDigit[0].ruleid,
                      bothDigit[0].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>{{ payoutValue(bothDigit[0].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[3].rule,
                      bothDigit[3].ruleid,
                      bothDigit[3].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                    <span>{{ payoutValue(bothDigit[3].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[4].rule,
                      bothDigit[4].ruleid,
                      bothDigit[4].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                    <span>{{ payoutValue(bothDigit[4].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerder018 = !drawerder018"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountBetSpecificNumber({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit'
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>0-18</h5>
                    <span>18.64</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[7].rule,
                      bothDigit[7].ruleid,
                      bothDigit[7].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[7].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>{{ payoutValue(bothDigit[7].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[6].rule,
                      bothDigit[6].ruleid,
                      bothDigit[6].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>{{ payoutValue(bothDigit[6].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[5].rule,
                      bothDigit[5].ruleid,
                      bothDigit[5].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: bothDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>{{ payoutValue(bothDigit[5].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- Both Digit -->

            <!-- TWO Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + bothDigit[2].rule,
                      twoDigit[2].ruleid,
                      twoDigit[2].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>{{ payoutValue(twoDigit[2].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[1].rule,
                      twoDigit[1].ruleid,
                      twoDigit[1].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>{{ payoutValue(twoDigit[1].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[0].rule,
                      twoDigit[0].ruleid,
                      twoDigit[0].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>{{ payoutValue(twoDigit[0].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[3].rule,
                      twoDigit[3].ruleid,
                      twoDigit[3].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                    <span>{{ payoutValue(twoDigit[3].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[4].rule,
                      twoDigit[4].ruleid,
                      twoDigit[4].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                    <span>{{ payoutValue(twoDigit[4].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerder099 = !drawerder099"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountBetSpecificNumber({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit'
                      })
                    "
                  />

                  <v-card-title class="d-block">
                    <h5>00-99</h5>
                    <span> 98.02</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[7].rule,
                      twoDigit[7].ruleid,
                      twoDigit[7].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[7].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>{{ payoutValue(twoDigit[7].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[6].rule,
                      twoDigit[6].ruleid,
                      twoDigit[6].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>{{ payoutValue(twoDigit[6].payout) }}</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[5].rule,
                      twoDigit[5].ruleid,
                      twoDigit[5].payout
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getAmountMultiGameBet({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: twoDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block ">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>{{ payoutValue(twoDigit[5].payout) }}</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- TWO Digit -->
          </v-tabs>
        </v-layout>

        <div class="bettingFooter" sm12 xs12>
          <v-flex sm6 xs6 pl-2>
            <v-flex
              >{{ $t("msg.totalAmount") }}:
              <!-- {{ formatToPrice(getBettingAmount) }} -->
              {{
                formatToPrice(
                  getAllSelectedBettingAmount(getGameUUIDByStockName($route.params.id)) 
                )
              }}</v-flex
            >
            <v-flex>
              {{ $t("msg.confirmBet") }} :
              {{
                formatToPrice(
                  getConfirmMultipleBetTotalAmount(getGameUUIDByStockName($route.params.id)))
              }}
            </v-flex>
          </v-flex>
          <v-flex sm6 xs6 class="pt-1">
            <v-btn
              :disabled="!parseInt(this.getTempMultiGameBetAmount)"
              class="confimButton"
              small
              @click="reviewMultiplebet()"
              >{{ $t("msg.confirmBet") }}</v-btn
            >
            <v-btn class="cancelButton" small @click="cancelBet()">
              {{ $t("msg.cancel") }}
            </v-btn>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
    <!-- dialog chip amount come here -->
    <v-dialog
      v-model="bettingDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <div class="dialog-content">
        <span class="close-dialog-icon">
          <v-icon size="30" @click="bettingDialog = false">close</v-icon>
        </span>
        <div
          xs12
          class="text-center mx-auto pa-2 round-3"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
        >
          <!-- Last Draw Stock Game -->
          <lastDraw />
          <div class="d-block text-center" style="color:#000">
            <p class="text-uppercase">
              <b> {{ $t("msg.stockName") }} : </b>
              {{ $t(`stockName.${$route.params.id}`) }}
              <b>{{ $t("msg.payout") }}:</b>
              {{ Number(odd).toFixed(2) }}
            </p>
            <!-- jump here -->
            <p class="text-uppercase test-time-loop">
              {{ getStockLoop(this.$route.params.id) }}
              {{ $t("msg.minuteGame") }}
            </p>
            <p class="text-uppercase test-rule-betting">
              {{ $t("msg.bettingOn") }}
              {{
                isNaN(gameRule.split("-")[1])
                  ? $t("gamemsg." + gameRule.split("-")[0]) +
                    "-" +
                    $t("gamemsg." + gameRule.split("-")[1])
                  : $t("gamemsg." + gameRule.split("-")[0]) +
                    "-" +
                    gameRule.split("-")[1]
              }}
            </p>
          </div>
        </div>
        <div xs12 class="text-center">
          <v-avatar
            class="ma-1"
            size="60"
            v-for="(item, key) in imgChip"
            :key="key"
            @click="shipClick(getCoinsModern[key])"
          >
            <v-img class="ma-4" :src="item.img" :alt="item.title">
              <span class="setpricechip">{{ getCoinsModern[key] }}</span>
            </v-img>
          </v-avatar>
        </div>

        <div xs10 class="px-2 text-center ml-4 mt-3">
          <input
            class="round-2 text-input"
            type="number"
            :min="minimumBetAmount"
            label="$0"
            v-model="betAmount"
            placeholder="0"
          />
          <br />
          {{ $t("msg.min") }} = ${{ this.minimumBetAmount }} ;{{
            $t("msg.max")
          }}
          = $10,000
        </div>

        <div xs12 class="px-2 text-center mt-3">
          <v-btn class="buttonGreen" @click="reviewbet()">{{
            $t("betting.reviewBet")
          }}</v-btn>
          <v-btn class="btn_cancel" @click="bettingDialog = false">{{
            $t("betting.cancelBet")
          }}</v-btn>
        </div>
      </div>
    </v-dialog>
    <!-- price: "200" -->
    <!-- Review Multiple  -->
    <v-dialog
      v-model="reviewMultipleBetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="reviewMultipleBetDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("betting.reviewYourBet") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div
          class="mx-auto round-3 mt-2"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
          color="#ffffff"
        >
          <div xs12 class="px-2 text-center mt-3">
            <v-layout row wrap>
              <v-flex class="text-right" xs6 md6>
                <h3>{{ $t("msg.totalBet") }}:</h3>
              </v-flex>
              <v-flex class="text-center" xs6 md6>
                <h4>{{ selectBetting.length }} {{ $t("leaderBoard.bets") }}</h4>
              </v-flex>
              <v-flex class="text-right" xs6 md6>
                <h3>{{ $t("msg.totalAmount") }}:</h3>
              </v-flex>
              <v-flex class="text-center" xs6 md6>
                <h4>${{ totalBetAmount }}</h4>
              </v-flex>
            </v-layout>
          </div>

          <div xs12 class="px-2 text-center mt-3">
            <v-btn class="buttonGreen" @click="confirmBet">{{
              $t("betting.placeBet")
            }}</v-btn>
            <v-btn class="btn_cancel" @click="cancelBet()">{{
              $t("betting.cancelBet")
            }}</v-btn>
          </div>

          <div xs12 class="text-center">
            <div class="d-block text-center" style="color:#000">
              <p>{{ $t("betting.pleaseConfirm") }}</p>
            </div>
          </div>
          <hr />

          <div xs12 class="text-center  pa-3">
            <!-- Last Draw Stock Game -->
            <lastDraw />
            <template v-for="(data, index) in getAllSelectedBetDataGameWise(getGameUUIDByStockName($route.params.id))" class="pa-0">
              <table class="table-review" :key="data.index">
                <tr>
                  <td class="text-right">{{ $t("msg.stockName") }}:</td>
                  <td class="text-left pl-2 text-color-blue">
                    {{ data.stockName }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right">{{ $t("msg.gameId") }}:</td>
                  <td class="text-left pl-2 text-color-blue">
                    {{ data.gameUUID }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right">{{ $t("gameType") }}:</td>
                  <td class="text-left pl-2 text-color-blue">
                    {{ getStockLoop(data.stockName) }}
                    {{ $t("msg.minuteGame") }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right">{{ $t("msg.bettingOn") }}:</td>
                  <td class="text-left pl-2 text-color-blue">
                    {{ data.class }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right">{{ $t("msg.payout") }}:</td>
                  <td class="text-left pl-2 text-color-blue">
                    {{ Number(odd).toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right">{{ $t("msg.amount") }}:</td>
                  <td class="text-left pl-2 text-color-green">
                    ${{ data.betAmount }}
                  </td>
                </tr>
              </table>
            </template>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- Review Multiple bet End -->
    <!-- Review bet  -->
    <v-dialog
      v-model="reviewbetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="reviewbetDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("betting.reviewYourBet") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div
          class="mx-auto round-3 mt-2"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
          color="#ffffff"
        >
          <div xs12 class="text-center mt-5 pa-3">
            <!-- Last Draw Stock Game -->
            <lastDraw />
            <table class="table-review">
              <tr>
                <td class="text-right">{{ $t("msg.stockName") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  <b>{{ $t(`stockName.${$route.params.id}`) }}</b>
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.gameId") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ getGameUUIDByStockName(this.$route.params.id) }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("gameType") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ getStockLoop(this.$route.params.id) }}
                  {{ $t("msg.minuteGame") }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.bettingOn") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{
                    isNaN(gameRule.split("-")[1])
                      ? $t("gamemsg." + gameRule.split("-")[0]) +
                        "-" +
                        $t("gamemsg." + gameRule.split("-")[1])
                      : $t("gamemsg." + gameRule.split("-")[0]) +
                        "-" +
                        gameRule.split("-")[1]
                  }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.payout") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ Number(odd).toFixed(2) }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.amount") }}:</td>
                <td class="text-left pl-2 text-color-green">
                  ${{ betAmount }}
                </td>
              </tr>
            </table>
          </div>

          <div xs12 class="text-center">
            <div class="d-block text-center" style="color:#000">
              <p>{{ $t("betting.pleaseConfirm") }}</p>
            </div>
          </div>
          <hr />

          <div xs12 class="px-2 text-center mt-3">
            <v-btn class="buttonGreen" @click="placeBet">{{
              $t("betting.placeBet")
            }}</v-btn>
            <v-btn class="btn_cancel" @click="reviewbetDialog = false">{{
              $t("betting.cancelBet")
            }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- price: "200" -->
    <!-- End review bet -->
    <!-- Test -->

    <!-- specific number first digit -->
    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerderfirst"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.firstdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerderfirst = !drawerderfirst"
          >close</v-icon
        >
      </div>
      <hr class="head-jumbothron" />

      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in firstDigitNumber"
            :key="index"
            @click="
              showBetDialog(
                `firstdigit-${index}`,
                item.ruleid,
                index + 30,
                true
              )
            "
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getAmountBetSpecificNumber({
                  gameUUID: getGameUUIDByStockName($route.params.id),
                  ruleID: `firstdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <!-- specific number last digit -->
    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerderlast"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.lastdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerderlast = !drawerderlast">close</v-icon>
      </div>
      <hr class="head-jumbothron" />
      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in lastDigitNumber"
            :key="index"
            @click="
              showBetDialog(`lastdigit-${index}`, item.ruleid, index + 40, true)
            "
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getAmountBetSpecificNumber({
                  gameUUID: getGameUUIDByStockName($route.params.id),
                  ruleID: `lastdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <!-- both digit -->

    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerder018"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.bothdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerder018 = !drawerder018">close</v-icon>
      </div>
      <hr class="head-jumbothron" />
      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in bothDigitNumber"
            :key="index"
            @click="
              showBetDialog(`bothdigit-${index}`, item.ruleid, index + 50, true)
            "
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getAmountBetSpecificNumber({
                  gameUUID: getGameUUIDByStockName($route.params.id),
                  ruleID: `bothdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>

    <!-- 0 -99 -->
    <!-- two digit -->
    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerder099"
      fixed
      temporary
    >
      <div style="display:flex;flex-direction:column">
        <div class="header-dialog">
          <h3 class="text-uppercase">{{ $t("gamemsg.twodigit") }}</h3>
          <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
          <v-icon size="30" @click="drawerder099 = !drawerder099">close</v-icon>
        </div>
        <v-layout row>
          <v-tabs slider-color="#003e70" grow centered>
            <v-tab>00 - 19</v-tab>
            <v-tab>20 - 39</v-tab>
            <v-tab>40 - 59</v-tab>
            <v-tab>60 - 79</v-tab>
            <v-tab>80 - 99</v-tab>
            <!-- 0 19 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index < 20"
                    @click="
                      showBetDialog(
                        `twodigit-${index < 10 ? '0' + index : index}`,
                        item.ruleid,
                        index + 69,
                        true
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getAmountBetSpecificNumber({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          ruleID: `twodigit-${index < 10 ? '0' + index : index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index < 10 ? "0" + index : index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 0 19 -->

            <!-- 20 39 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 19 && index < 40"
                    @click="
                      showBetDialog(
                        `twodigit-${index}`,
                        item.ruleid,
                        index + 69
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 20 39 -->

            <!--40 59 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 39 && index < 60"
                    @click="
                      showBetDialog(
                        `twodigit-${index}`,
                        item.ruleid,
                        index + 69
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!--40 59 -->

            <!--60 79 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 59 && index < 80"
                    @click="
                      showBetDialog(
                        `twodigit-${index}`,
                        item.ruleid,
                        index + 69
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!--60 79 -->

            <!-- 80 99 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 79"
                    @click="
                      showBetDialog(
                        `twodigit-${index}`,
                        item.ruleid,
                        index + 69
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 80 99 -->
          </v-tabs>
        </v-layout>
      </div>
    </v-navigation-drawer>

    <!-- 0 -99 -->
  </div>
</template>

<script>
import gameRule from "~/data/gameRule";
import chips from "~/data/chips";

import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import chartMobile from "~/components/mobile/chartMobile";
import showChipAmount from "~/components/modern/showChipAmount";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";
import Betting from "~/helpers/betting";
import { BetResult } from "~/mixin/betResult";
import { itemBetting } from "~/mixin/itemBetting";
import tableTrendMapMobile from "~/components/modern/tableTrendMapMobile"; // Road Map
import lastDraw from "~/components/mobile/lastDraw";
import jsonResult from "~/data/result.json";
import utils from "~/mixin/utils";
export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  mixins: [BetResult, itemBetting],
  data() {
    return {
      isSending: false,
      leftActive: {
        left: "2%"
      },
      // rule id
      firstDigit: gameRule.firstDigit,
      lastDigit: gameRule.lastDigit,
      bothDigit: gameRule.bothDigit,
      twoDigit: gameRule.twoDigit,
      firstDigitNumber: gameRule.firstDigitNumber,
      lastDigitNumber: gameRule.lastDigitNumber,
      bothDigitNumber: gameRule.bothDigitNumber,
      twoDigitNumber: gameRule.twoDigitNumber,
      // rule id
      trendType: "firstdigit",
      isShowTrendMap: false,

      stockID: "",
      bettingDialog: false,
      reviewbetDialog: false,
      reviewMultipleBetDialog: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      drawerderfirst: null,
      drawerderlast: null,
      drawerder018: null,
      drawerder099: null,
      imgChip: chips.chipsDataMobile,
      odd: null,
      gameRule: "null",
      confirmDisabled: false,
      ruleid: "",
      betAmount: 100,
      specific: true,
      winBetPop: false,
      winBetInfo: [],
      resultData: "",
      winBetData: [],
      minimumBetAmount: 10
    };
  },
  // stop listen on  socket
  beforeDestroy() {
    this.stopListenSocket(
      `roadMap.${this.getStockUUIDByStockName(this.$route.params.id)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    //  this.getTimerByStockName(this.$route.params.id).gameEndTimeCountDownInSec > 50 ? this.winBetPop = true : this.winBetPop = false
    this.stockID = this.$route.params.id;

    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // Live Road Map From Socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
          } else {
            throw new Error(this.$root.$t("error.general"));
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  components: {
    lastDraw,
    chartMobile,
    showChipAmount,
    tableTrendMapMobile
  },
  computed: {
    ...mapGetters([
      "getAllSelectedBetDataGameWise",
      "getUserCurrency",
      "getMultiGameBet",
      "getPreviousGameID",
      "getConfirmMultipleBetTotalAmount",
      "getAllSelectedBettingAmount",
      "selectBetting",
      "getIsSendBetting",
      "getUserBalance",
      "getTempMultiGameBetAmount",
      "getFooterBetAmount",
      "getAmountBetSpecificNumber",
      "getAmountMultiGameBet",
      "getStockLivePrice",
      "getStockLiveTime",
      "getLastDraw",
      "getUserUUID",
      "getTimerByStockName",
      "getStockLoop",
      "getGameUUIDByStockName",
      "getCheckStock",
      "getCoinsModern",
      "getBettingAmount",
      "getBetAmountRuleID",
      "getRoadMap",
      "getStockUUIDByStockName",
      "getPortalProviderUUID",
      "getLocale",
      "gettempMultiGameBetData"
    ]),
    totalBetAmount() {
      let totalAmount = null;
      this.selectBetting.map(item => {
        totalAmount += item.betAmount;
      });
      return totalAmount;
    },
    checkBettingResult() {
      // Stock Time
      const stockTime = this.getTimerByStockName(this.stockID);

      // New Game Open Old Game Stock Result Popup
      if (this.getStockLoop(this.stockID) === 5) {
        var resultSecond = 296;
      } else {
        var resultSecond = 56;
      }
      if (stockTime && stockTime.gameEndTimeCountDownInSec == resultSecond) {
        this.resultFetch(); // Fetch Previous Game Result
      } else if (
        stockTime &&
        stockTime.gameEndTimeCountDownInSec <= resultSecond - 2 &&
        stockTime.gameEndTimeCountDownInSec >= resultSecond - 6
      ) {
        // Update Previous Game ID
        this.setNewGameId(this.getGameUUIDByStockName(this.$route.params.id));
        this.winBetInfo = "";
      }
    },
    // check bet close using stockOpenOrClosed and timer
    checkBetCloseMobile() {
      const stockTime = this.getTimerByStockName(this.stockID);
      if (stockTime && stockTime.stockStatus === "Closed") {
        return true;
      }

      if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
        this.clearDataMultiGameBetSend();
        this.clearTempMultiGameBetData();

        this.clearItemBetting();

        secureStorage.removeItem("itemBetting");
      }
      // check 1 or 5 loop
      if (this.getStockLoop(this.stockID) === 5) {
        if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
          this.closeReviewTab(); // Close review Tab and Conform Bet pop
          this.clearDataMultiGameBet(5);
        }
        if (stockTime && stockTime.gameEndTimeCountDownInSec <= 60) {
          if (stockTime && stockTime.gameEndTimeCountDownInSec === 60) {
            this.CLEAR_TEMP_CHIPS_IMAGE();
            this.closeReviewTab(); // Close review Tab and Conform Bet pop
            $(".closepopper").click();
            this.clearTempMultiGameBetData();
          }
          return true;
        } else {
          return false;
        }
      } else {
        if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
          this.clearDataMultiGameBet(1);
          this.closeReviewTab(); // Close review Tab and Conform Bet pop
        }
        if (stockTime && stockTime.gameEndTimeCountDownInSec <= 20) {
          if (stockTime && stockTime.gameEndTimeCountDownInSec === 20) {
            this.CLEAR_TEMP_CHIPS_IMAGE();
            this.closeReviewTab(); // Close review Tab and Conform Bet pop
            Betting.clearBettingSelect(this.selectBetting);
            this.CLEAR_SELECT_BETTING();
            this.setCollegeButtonNumberParent(
              "Betting are not confirm have to clear"
            ); // make the button collage
            $(".closepopper").click();
            this.clearTempMultiGameBetData();
          }
          return true;
        } else {
          return false;
        }
        // return true;
      }
    }
  },
  methods: {
    ...mapMutations(["CLEAR_SELECT_BETTING", "CLEAR_TEMP_CHIPS_IMAGE"]),
    ...mapActions([
      "clearPreviousGameId",
      "setNewGameId",
      "sendBetting",
      "setTempMultiGameBetData",
      "clearDataMultiGameBetSend",
      "setFooterBetAmount",
      "pushDataOnGoingBet",
      "clearDataMultiGameBet",
      "setLiveRoadMap",
      "setRoadMap",
      "setUserData",
      "setSnackBarMessage",
      "clearTempMultiGameBetData",
      "clearTempChips",
      "clearBetValueFooterBet",
      "clearItemBetting"
    ]),
    // Place Bet Last Step
    async resultFetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          gameUUID: this.getPreviousGameID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        var res = await this.$axios.$post(config.checkBetStatus.url, reqBody, {
          headers: config.header
        });
        if (res.code == 200 && res.data.length > 0) {
          let resultStatus = {
            win: 0,
            loss: 0
          };
          let resultData = [];
          // Sum Same Rule Name BetAmount
          res.data.forEach(function(a) {
            if (!this[a.ruleName]) {
              this[a.ruleName] = {
                ruleName: a.ruleName,
                betAmount: 0,
                betResult: a.betResult,
                rollingAmount: 0
              };
              resultData.push(this[a.ruleName]);
            }
            this[a.ruleName].betAmount += a.betAmount;
            this[a.ruleName].rollingAmount += a.rollingAmount;
          }, Object.create(null));

          // Sperate Win and Loss Amount Rule Wise
          resultData.forEach(element => {
            const result = element.betResult == "Win" ? "green" : "red";
            const winAmount =
              element.rollingAmount == 0
                ? "-$" + element.betAmount
                : "+$" + element.rollingAmount;

            if (element.betResult == "Win") {
              resultStatus.win += element.rollingAmount - element.betAmount;
            } else if (element.betResult == "Lose") {
              resultStatus.loss += element.betAmount;
            }
            const ruleData = isNaN(element.ruleName.split("_")[1])
              ? window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[0]
                ) +
                "-" +
                window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[1]
                )
              : window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[0]
                ) +
                "-" +
                element.ruleName.split("_")[1];

            this.winBetData += `<div class="betResult">
         ${window.$nuxt.$root.$t("gamemsg.you")}
             <b>${ruleData}</b>  <span style="color:${result}"> ${window.$nuxt.$root.$t(
              "stockList." + element.betResult
            )} </span>   : <span  style="color:${result}"> ${winAmount} </span>
         </div>`;
          });

          if (resultStatus.win >= resultStatus.loss) {
            this.resultData = `<span style="color:green"> ${window.$nuxt.$root.$t(
              "betHistory.yourWinningAmount"
            )} +$${resultStatus.win - resultStatus.loss} </span>`;
          } else {
            this.resultData = `<span style="color:red">${window.$nuxt.$root.$t(
              "betHistory.yourLosingAmount"
            )} -$${resultStatus.loss - resultStatus.win} </span>`;
          }

          this.winBetInfo += `<div class="betResult">  ${this.winBetData} <h1>${this.resultData}</h1> </div>`;

          this.$swal({
            title: window.$nuxt.$root.$t("msg.betResult"),
            html: this.winBetInfo,
            confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      } catch (ex) {
        // this.setSnackBarMessage(ex.message);
      }
    },
    // listen socket
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // stop listen socket
    stopListenSocket(channel) {
      window.Echo.leave(channel);
    },
    // deal with tab
    // to switch game rule first digit =>... two digit
    tabChanged(e) {
      switch (e) {
        case 0:
          this.leftActive.left = "2%";
          this.trendType = "firstDigit";
          break;
        case 1:
          this.leftActive.left = "27%";

          this.trendType = "lastDigit";

          break;
        case 2:
          this.leftActive.left = "52%";

          this.trendType = "bothDigit";

          break;
        case 3:
          this.leftActive.left = "77%";
          this.trendType = "twoDigit";

          break;
        default:
          this.setSnackBarMessage(this.$root.$t("error.general"));
      }
    },
    closeReviewTab() {
      this.reviewMultipleBetDialog = false; // Review Multiple Bet Close
      this.reviewbetDialog = false; // Review Single bet close
      this.bettingDialog = false;
    },
    // switch between chart and tren map
    changeShowTrendMap() {
      this.isShowTrendMap = !this.isShowTrendMap;
    },
    payoutValue(payoutIndex) {
      return this.$store.state.game.payout[payoutIndex].dynamicOdds.toFixed(2);
    },
    // show bet dialog
    showBetDialog(rule, ruleid, payoutIndex, specific) {
      this.gameRule = rule;
      this.ruleid = ruleid;
      this.odd = this.$store.state.game.payout[payoutIndex].dynamicOdds.toFixed(
        2
      );
      this.specific = specific;
      // Check bet Amount is grater then Minum Amount
      if (this.getFooterBetAmount >= this.minimumBetAmount) {
        // Total Confirm Amount
        const TotalAmount = this.getAllSelectedBettingAmount(this.getGameUUIDByStockName(this.$route.params.id))
          ? this.getAllSelectedBettingAmount(this.getGameUUIDByStockName(this.$route.params.id)) + this.getFooterBetAmount
          : 0 + this.getFooterBetAmount;
        // Check current Balance is grater then Footer Bet Amount
        if (this.getUserBalance >= this.getFooterBetAmount) {
          var newBetAmount = this.getFooterBetAmount;
          if (this.getUserBalance <= TotalAmount) {
            var newBetAmount =
              this.getFooterBetAmount - (TotalAmount - this.getUserBalance);
          }
          if (newBetAmount > 0) {
            const betData = {
              id: this.stockID + this.gameRule,
              class: this.gameRule,
              specificNumber: specific,
              gameUUID: this.getGameUUIDByStockName(this.stockID),
              ruleID: ruleid,
              betAmount: newBetAmount,
              stockName: this.stockID
            };
            this.setTempMultiGameBetData(betData);
          } else {
            this.$swal({
              type: "info",
              title: window.$nuxt.$root.$t("notification.insufficientBalance"),
              confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }
        } else {
          this.$swal({
            type: "info",
            title: window.$nuxt.$root.$t("notification.insufficientBalance"),
            confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      } else {
        this.bettingDialog = true;
      }
    },
    // set bet amount when click on the chip
    shipClick(value) {
      this.betAmount = this.betAmount + parseInt(value);
    },
    // display modal review bet
    reviewbet() {
      if (this.betAmount >= this.minimumBetAmount) {
        this.reviewbetDialog = true;
      } else {
        this.setSnackBarMessage("Please enter Min Bet Amount.");
      }
    },
    // Display Modal Review Multiple bet
    reviewMultiplebet() {
      if (this.getFooterBetAmount >= this.minimumBetAmount) {
        this.reviewMultipleBetDialog = true;
      } else {
        this.setSnackBarMessage("Please enter Min Bet Amount.");
      }
    },
    async confirmBet() {
      try {
        if (
          parseInt(this.getTempMultiGameBetAmount) <=
            parseInt(this.getUserBalance) &&
          parseInt(this.getTempMultiGameBetAmount) > 0
        ) {
          this.isSending = true;
          this.sendBetting(this.getGameUUIDByStockName(this.$route.params.id));
          this.setFooterBetAmount(0);
          this.isSending = false;
          this.clearTempMultiGameBetData();
          this.reviewMultipleBetDialog = false;
        } else {
          await Betting.cancelBettingClear(this.gettempMultiGameBetData);
          this.clearTempMultiGameBetData();
          this.setSnackBarMessage(this.$root.$t("betting.betSuccess"));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async clearChipsAmount() {
      await this.clearBetValueFooterBet();
    },
    //use for cancel the bet
    async cancelBet() {
      try {
        this.isSending = false;
        await Betting.cancelBettingClear(this.gettempMultiGameBetData);
        await this.clearTempMultiGameBetData();
        await this.clearTempChips();
        await this.clearBetValueFooterBet();
        await this.CLEAR_SELECT_BETTING();
        this.reviewMultipleBetDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    // Place Bet Last Step
    placeBet() {
      if (this.betAmount > 10000) {
        this.setSnackBarMessage(this.$root.$t("betting.betValue"));
      } else {
        let data = {
          gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
          ruleID: this.ruleid,
          betAmount: this.betAmount
        };
        this.confirmDisabled = true;

        const stockDetail = {
          betAmount: this.betAmount,
          class: this.gameRule.split("-")[0],
          gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
          id: this.$route.params.id + this.gameRule,
          ruleID: this.ruleid,
          specificNumber: this.specific,
          betRule: this.gameRule
        };
        this.sendBettingSingle(data, stockDetail);
      }
    },
    // send Betting data to server
    async sendBettingSingle(betData, itemBetting) {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version,
          betData: [betData]
        };
        var res = await this.$axios.$post(config.storeBet.url, reqBody, {
          headers: config.header
        });
        if (res.code == 200) {
          if (res.data[0].status) {
            this.$StoreBettingonConfirm(itemBetting);
            this.setUserData();
            this.betAmount = 100;
            this.bettingDialog = false;
            this.reviewbetDialog = false;
            this.pushDataOnGoingBet(res.data[0]);
            this.setSnackBarMessage(this.$root.$t("betting.betSuccess"));
          } else {
            this.setSnackBarMessage(res.data[0].message[0]);
          }
        } else {
          this.setSnackBarMessage(this.$root.$t("error.general"));
        }
      } catch (ex) {
        this.confirmDisabled = false;
        this.setSnackBarMessage(ex.message);
      }
    },
    formatToPrice(value) {
      return `$${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
  },
  watch: {
    // check screen size mobile or desktop version
    "$screen.width"() {
      if (this.$screen.width > 1204) {
        let linkto = `/modern/desktop/${this.$route.params.id}`;
        this.$router.push(linkto);
      }
    },
    bettingDialog(value) {
      if (!value) {
        this.betAmount = 100;
      }
    }
  }
};
</script>

<style scoped>
.betResult {
  width: 100%;
  border: 1px solid #dddddd;
}
.multipleChips {
  position: relative;
  padding: 2px;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
.box-click1 {
  background-color: red;
}
.text-time {
  font-weight: 600;
  color: #003f70;
}
.text-price {
  font-weight: 600;
  color: green;
}
.tab-menu-container {
  position: relative;
  z-index: 2;
  top: 5px;
  height: 70px;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.digit-type-container {
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-align: center;
}
.btn-digit-type {
  margin: 5px;
  width: 25%;
  border-radius: 10px;
  padding: 5px;
}
.active-tab-mark {
  width: 21%;
  height: 3px;
  background-color: #2e477d;
  border-radius: 10px;
  position: relative;
  top: -3px;
  transition: left 0.3s;
}

.first-digit {
  height: 40px;
  font-size: 12px;
  background: rgb(13, 204, 255);
  background: linear-gradient(
    22deg,
    rgba(13, 204, 255, 1) 0%,
    rgba(71, 96, 255, 1) 100%
  );
}
.last-digit {
  height: 40px;
  font-size: 12px;
  background: rgb(250, 209, 38);
  background: linear-gradient(
    22deg,
    rgba(250, 209, 38, 1) 0%,
    rgba(255, 84, 79, 1) 100%
  );
}

.both-digit {
  height: 40px;
  font-size: 12px;
  background: rgb(182, 53, 156);
  background: linear-gradient(
    22deg,
    rgba(182, 53, 156, 1) 0%,
    rgba(239, 10, 106, 1) 100%
  );
}
.two-digit {
  height: 40px;
  font-size: 12px;
  background: rgb(1, 233, 189);
  background: linear-gradient(
    22deg,
    rgba(1, 233, 189, 1) 0%,
    rgba(0, 124, 222, 1) 100%
  );
}
.close-dialog-icon {
  position: absolute;
  top: 3px;
  right: 12px;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
.header-dialog {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
}
h4 {
  font-size: 16px;
}

.text-size08 {
  padding: 0px 5px;
  font-size: 0.8em;
}

.chartDesgin {
  margin-top: 10px;
  padding: 0px;
  background-color: #fff;
  border-radius: 5px;
}

.v-dialog__content.v-dialog__content--active .v-dialog.v-dialog--active {
  position: absolute;
  right: 0px;
  margin: 0px;
  padding: 0px;
  width: 50%;
  max-height: 100% !important;
}

.bettingFooter {
  border-radius: 15px;
  margin-top: 10px;
  padding: 5px;
  color: #fff;
  background-color: #8291b2;
  /* text-align: center !important; */
  font-size: 14px;
  display: flex;
}
.confimButton {
  background-color: #fff;
  font-size: 13px;
  padding: 4px !important;
  color: green !important;
  border-radius: 4px;
  max-width: 18px !important;
  margin: 0;
}
.cancelButton {
  background-color: #fff;
  font-size: 13px !important;
  padding: 4px !important;
  color: #333 !important;
  border-radius: 4px;
}
.clearButton {
  background-color: #fff;
  font-size: 13px !important;
  padding: 2px 8px !important;
  color: #333 !important;
  border-radius: 4px;
  margin-left: 6px;
}
.setpricechip {
  position: relative;
  top: 0px;
  color: black;
  font-size: 10px;
  font-weight: 600;
}

.btn_cancel {
  background-color: #656464 !important;
  color: white;
  border-radius: 7px;
}

.d-grid {
  display: grid;
}

.round-2 {
  border-radius: 10px;
}

.round-3 {
  border-radius: 10px !important;
  text-align: center;
}

.test-time-loop {
  font-size: 16px;
  font-weight: bold;
}

.test-rule-betting {
  font-size: 22px;
  font-weight: bold;
  color: #193571;
}

.text-input {
  height: 40px;
  border: 2px solid #cdcdcd;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.table-review {
  margin-top: 6%;
  border: 0px;
}
.table-review td {
  padding: 8px;
}
.text-color-blue {
  color: #2e477d;
  font-weight: bold;
}

.text-color-green {
  color: #17b542;
  font-weight: bold;
}
.roadMap {
  border-radius: 40px;
  background-color: #2e477d !important;
  color: #fff;
  float: right;
  font-size: 13px;
  padding: 2px 10px;
  font-weight: 400;
}
.roadMap .roadMapIcon {
  color: #fff;
}
</style>
