<template>
  <div>
    <v-layout style="margin: 0 0 -1% 0px;">
      <v-flex>
        <v-layout row wrap class="pt-1">
          <v-flex xs12 sm6>
            <v-layout>
              <v-flex class="text-xs-center">
                <span class="uppercase-text grey--text">{{ $t("msg.Lastdraw") }}:</span>
                <v-flex flex-style class="lastdraw">
                  <h4 class="body-3">
                    <span class="text-black" v-html="$options.filters.lastDraw(getLastDraw)"></span>
                  </h4>
                </v-flex>
              </v-flex>

              <v-flex class="text-xs-center">
                <span class="uppercase-text grey--text">{{ $t("msg.BetClosein") }}:</span>
                <v-flex flex-style class="betclose">
                  <h4 class="body-3 uppercase-text text-black">
                    {{
                    getTimerByStockName(this.$route.params.id) &&
                    getTimerByStockName(this.$route.params.id)
                    .gameEndTimeCountDownInSec
                    | betclosein(getStockLoop(this.$route.params.id))
                    }}
                  </h4>
                </v-flex>
              </v-flex>

              <v-flex class="text-xs-center">
                <span class="uppercase-text grey--text">{{ $t("msg.lotterydraw") }}:</span>
                <v-flex flex-style class="lottery">
                  <h4 class="body-3 uppercase-text text-black">
                    {{
                    getTimerByStockName(this.$route.params.id) &&
                    getTimerByStockName(this.$route.params.id)
                    .gameEndTimeCountDownInSec
                    | lotterydraw(getStockLoop(this.$route.params.id))
                    }}
                  </h4>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6 pt-3>
            <v-layout xs12 sm6>
              <v-flex xs12 xs6 class="text-xs-center">
                <v-btn class="buttonGreensmall">
                  {{
                  $t("msg.Game Mode")
                  }}
                </v-btn>
              </v-flex>
              <v-flex xs12 xs6 class="text-xs-center">
                <v-btn class="buttonGreensmall">
                  <nuxt-link to="/modern" class="text-white">
                    {{
                    $t("msg.otherstock")
                    }}
                  </nuxt-link>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- betting zone -->
    <v-layout row wrap class="container-bet">
      <v-flex xs12 sm6 md12>
        <v-layout wrap xs6>
          <v-flex xs1 align-self-center class="text-xs-right">
            <v-icon
              color="#003e70"
              v-show="isShowTrendMap"
              @click="changeShowTrendMap()"
            >keyboard_arrow_left</v-icon>
          </v-flex>

          <v-flex v-if="isShowTrendMap" xs10 class="text-xs-center py-2">
            <trendMap
              :dataArray="getRoadMap"
              :trendType="trendType"
              :isFullscreen="false"
              :key="
                getRoadMap[getRoadMap.length - 1].stockTimestamp + trendType
              "
              :rowTable="4"
              :lop="30"
            ></trendMap>
          </v-flex>

          <v-flex v-else xs10 class="text-xs-center">
            <span>
              <h3 class="text-uppercase">{{ $t("stockname." + $route.params.id) }}</h3>
              <span class="text-primary">
                <span>{{ getStockLoop(this.$route.params.id) }}</span>
                {{ $t("msg.minute game") }} | ID:
                <span>{{ getGameUUIDByStockName(this.$route.params.id) }}</span>
              </span>
            </span>
            <v-flex pa-2 xs12 class="chartDesgin">
              <chartMobile :stockName="$route.params.id"></chartMobile>
            </v-flex>
          </v-flex>

          <v-flex xs1 align-self-center arrow>
            <v-icon
              style="font-size:40px;"
              v-show="!isShowTrendMap"
              @click="changeShowTrendMap()"
              color="#003e70"
            >keyboard_arrow_right</v-icon>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex>
        <div
          sm12
          xs12
          class="betClose"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : ' width: 50%;'"
          v-if="checkBetClose"
        >
          <p>{{ $t("msg.betclosed") }}</p>
        </div>
        <v-layout wrap sm6>
          <v-tabs
            grow
            centered
            style="width:100%;background-color: #f2f4ff;"
            @change="tabChanged($event)"
          >
            <v-tab class="firstdigit border-radius mr-1 ml-1">
              <span class="text-pre-line text-white">
                {{
                $t("gamemsg.firstdigits")
                }}
              </span>
            </v-tab>
            <v-tab class="lastdigit border-radius mr-1 ml-1">
              <span class="text-pre-line text-white">
                {{
                $t("gamemsg.lastdigits")
                }}
              </span>
            </v-tab>
            <v-tab class="bothdigit border-radius mr-1 ml-1">
              <span class="text-pre-line text-white">
                {{
                $t("gamemsg.bothdigits")
                }}
              </span>
            </v-tab>
            <v-tab class="twodigit border-radius mr-1 ml-1">
              <span class="text-pre-line text-white">
                {{
                $t("gamemsg.twodigits")
                }}
              </span>
            </v-tab>

            <!-- First Digit -->

            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog('firstdigit-small', firstDigit[1].ruleid)
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>5 TO 9</span>
                  </v-card-title>
                </v-card>
                <v-card
                  class="box-click"
                  @click="showBetDialog('firstdigit-big', firstDigit[0].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 4</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('firstdigit-odd', firstDigit[2].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog('firstdigit-even', firstDigit[3].ruleid)
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card class="box-click" @click.stop="drawerderfirst = !drawerderfirst">
                  <v-card-title class="o-even">
                    <h5>0-9</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('firstdigit-low', firstDigit[6].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 3</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('firstdigit-mid', firstDigit[5].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>4 TO 6</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog('firstdigit-high', firstDigit[4].ruleid)
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>7 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>

            <!-- last digit -->
            <v-tab-item>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-small', lastDigit[1].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 4</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-big', lastDigit[0].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>5 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-odd', lastDigit[2].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-even', lastDigit[3].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card class="box-click" @click.stop="drawerderlast = !drawerderlast">
                  <v-card-title class="o-even">
                    <h5>0-9</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-low', lastDigit[6].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 3</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-mid', lastDigit[5].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>4 TO 6</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('lastdigit-high', lastDigit[4].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>7 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>

            <!-- Both Digit -->
            <v-tab-item>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-small', bothDigit[2].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 9</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-tie', bothDigit[1].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-tie'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>0</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-big', bothDigit[0].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>9 TO 18</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-odd', bothDigit[3].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-even', bothDigit[4].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card class="box-click" @click.stop="drawerder018 = !drawerder018">
                  <v-card-title class="o-even">
                    <h5>0-18</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-low', bothDigit[7].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 5</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-mid', bothDigit[6].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>6 to 11</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('bothdigit-high', bothDigit[5].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>12 to 18</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>

            <!-- Both Digit -->

            <!-- TWO Digit -->
            <v-tab-item>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-small', twoDigit[2].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>00 TO 49</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-tie', twoDigit[1].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-tie'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>0</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-big', twoDigit[0].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>50 TO 99</span>
                  </v-card-title>
                </v-card>
              </v-layout>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-odd', twoDigit[3].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-even', twoDigit[4].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card class="box-click" @click.stop="drawerder099 = !drawerder099">
                  <v-card-title class="o-even">
                    <h5>00-99</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-low', twoDigit[8].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 33</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-mid', twoDigit[7].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>34 to 66</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="showBetDialog('twodigit-high', twoDigit[6].ruleid)"
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>66 to 99</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>

            <!-- TWO Digit -->
          </v-tabs>
        </v-layout>

        <div class="bettingFooter justify-center settotalbet sm10 xs10">
          <span class="text-size08">
            {{ $t("msg.totalbet") }}:
            {{ formatToPrice(getAllBettingAmount) }}
          </span>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="bettingDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <v-card tile color="#f4f6fd">
        <v-toolbar flat>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-icon size="30" @click="bettingDialog = false">close</v-icon>
          </v-layout>
        </v-toolbar>

        <v-card
          class="mx-auto pa-2 round-3"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
          color="#ffffff"
        >
          <v-flex xs12 class="text-center">
            <div class="d-block text-center" style="color:#000">
              <p class="text-uppercase">
                {{ $t('msg.Stock Name')}} : {{ $t(`stockname.${$route.params.id}`) }} {{ $t('msg.payout')}}:
                {{ odd }}
              </p>
              <p
                class="text-uppercase test-time-loop"
              >{{ getStockLoop(this.$route.params.id) }} {{ $t('msg.minute game')}}</p>
              <p class="text-uppercase test-rule-betting">{{$t('msg.bettingon')}} {{ gameRule }}</p>
            </div>
          </v-flex>

          <v-flex xs12 class="text-center">
            <v-avatar
              size="60"
              v-for="(item, key) in imgChip"
              :key="key"
              @click="shipClick(getCoinsModern[key])"
            >
              <v-img class="ma-4" :src="item.img" :alt="item.title">
                <span class="setpricechip">{{ getCoinsModern[key] }}</span>
              </v-img>
            </v-avatar>
          </v-flex>

          <v-flex xs10 class="px-2 text-center ml-4 mt-3">
            <input class="round-2 text-input" type="number" readonly label="$0" v-model="betAmount" />
            <br />
            {{$t('msg.min')}} = $100 ;{{$t('msg.max')}} = $5000
          </v-flex>

          <v-flex xs12 class="px-2 text-center mt-3">
            <v-btn class="buttonGreen" @click="reviewbet()">{{$t('betting.reviewBet')}}</v-btn>
            <v-btn class="btn_cancel" @click="bettingDialog = false">{{$t('betting.cancelBet')}}</v-btn>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <!-- price: "200" -->
    <!-- Review bet  -->
    <v-dialog
      v-model="reviewbetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <v-card tile color="#f4f6fd">
        <v-toolbar flat>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-icon size="30" @click="reviewbetDialog = false">close</v-icon>
          </v-layout>
        </v-toolbar>

        <v-card
          class="mx-auto pa-2 round-3"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
          color="#ffffff"
        >
          <v-flex xs12 class="text-center">
            <div class="d-block text-center" style="color:#000">
              <h2 class="text-color-blue">{{$t('betting.reviewyourBet')}}</h2>
              <p>{{$t('betting.pleaseConfirm')}}</p>
            </div>
          </v-flex>
          <hr />
          <v-flex xs12 class="text-center">
            <table class="table-review">
              <tr>
                <td class="text-right">{{$t('msg.Stock Name')}}:</td>
                <td class="text-left pl-2 text-color-blue">{{ $t(`stockname.${$route.params.id}`) }}</td>
              </tr>
              <tr>
                <td class="text-right">{{$t('msg.gameid')}}:</td>
                <td
                  class="text-left pl-2 text-color-blue"
                >{{ getGameUUIDByStockName(this.$route.params.id) }}</td>
              </tr>
              <tr>
                <td class="text-right">{{$t('game type')}}:</td>
                <td
                  class="text-left pl-2 text-color-blue"
                >{{ getStockLoop(this.$route.params.id) }} Minute game</td>
              </tr>
              <tr>
                <td class="text-right">{{$t('msg.bettingon')}}:</td>
                <td class="text-left pl-2 text-color-blue">{{ gameRule }}</td>
              </tr>
              <tr>
                <td class="text-right">{{$t('msg.payout')}}:</td>
                <td class="text-left pl-2 text-color-blue">1.95</td>
              </tr>
              <tr>
                <td class="text-right">{{$t('msg.amount')}}:</td>
                <td class="text-left pl-2 text-color-green">{{ betAmount }}</td>
              </tr>
            </table>
          </v-flex>

          <v-flex xs12 class="px-2 text-center mt-3">
            <v-btn class="buttonGreen" @click="placeBet">{{$t('betting.placeBet')}}</v-btn>
            <v-btn class="btn_cancel" @click="reviewbetDialog = false">{{$t('betting.cancelBet')}}</v-btn>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <!-- price: "200" -->
    <!-- End review bet -->
    <!-- Test -->

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerderfirst" fixed temporary>
      <v-layout row mt-4>
        <div class="d-block">
          <h3 class="text-uppercase">{{ $t(`stockname.${$route.params.id}`) }}</h3>
          <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        </div>
        <v-btn class="close" flat @click="drawerderfirst = !drawerderfirst">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <!-- specific number first digit -->
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in firstDigitNumber"
            :key="index"
            @click="showBetDialog(`firstdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `firstdigit-${index}`
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

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerderlast" fixed temporary>
      <v-layout row mt-5>
        <div class="d-block">
          <!-- <h3 class="text-uppercase">{{getStockById(this.$route.params.id).stockname}}</h3>
          <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>-->
        </div>
        <v-btn class="close" flat @click="drawerderlast = !drawerderlast">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in lastDigitNumber"
            :key="index"
            @click="showBetDialog(`lastdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `lastdigit-${index}`
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

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerder018" fixed temporary>
      <v-layout row mt-5>
        <div class="d-block">
          <!-- <h3 class="text-uppercase">{{getStockById(this.$route.params.id).stockname}}</h3>
          <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>-->
        </div>
        <v-btn class="close" flat @click="drawerder018 = !drawerder018">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in bothDigitNumber"
            :key="index"
            @click="showBetDialog(`bothdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `bothdigit-${index}`
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

    <!-- Test -->
    <!-- 0 -99 -->
    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerder099" fixed temporary>
      <v-layout row mt-4>
        <v-tabs slider-color="#003e70" grow centered>
          <v-tab>00 - 19</v-tab>
          <v-tab>20 - 39</v-tab>
          <v-tab>40 - 59</v-tab>
          <v-tab>60 - 79</v-tab>
          <v-tab>80 - 99</v-tab>
          <!-- 0 19 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item, index) in twoDigitNumber"
                  :key="index"
                  v-show="index < 20"
                  @click="
                    showBetDialog(
                      `twodigit-${index < 10 ? '0' + index : index}`,
                      item.ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        gameRule: `twodigit-${index < 10 ? '0' + index : index}`
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
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item, index) in twoDigitNumber"
                  :key="index"
                  v-show="index > 19 && index < 40"
                  @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
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
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item, index) in twoDigitNumber"
                  :key="index"
                  v-show="index > 39 && index < 60"
                  @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
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
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item, index) in twoDigitNumber"
                  :key="index"
                  v-show="index > 59 && index < 80"
                  @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
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
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item, index) in twoDigitNumber"
                  :key="index"
                  v-show="index > 79"
                  @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
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
    </v-navigation-drawer>

    <!-- 0 -99 -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import chartMobile from "~/components/chartMobile";
import payout from "~/data/payout";
import showChipAmount from "~/components/modern/showChipAmount";
import trendMap from "~/components/modern/trendMap";
import config from "../../../config/config.global";
import gameRule from "../../../data/gameRule";
import chips from "../../../data/chips";
export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  data() {
    return {
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
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small: payout.big_small,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,

      stockID: "",
      bettingDialog: false,
      reviewbetDialog: false,
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
      betAmount: 0
    };
  },
  beforeDestroy() {
    this.stopListenSocket(
      `roadMap.${this.getStockUUIDByStockName(this.routeParams)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  created() {
    // get road map data from API
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // live road map from socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        console.log("live road map");
        this.setLiveRoadMap(data.data.roadMap[0]);
      }
    );
  },
  mounted() {
    this.stockID = this.$route.params.id;
  },
  components: {
    chartMobile,
    trendMap,
    showChipAmount
  },
  computed: {
    ...mapGetters([
      "getLastDraw",
      "getUserUUID",
      "getTimerByStockName",
      "getStockLoop",
      "getGameUUIDByStockName",
      "getStockById",
      "getLiveTime",
      "getCheckStock",
      "getCoinsModern",
      "getAllBettingAmount",
      "getAuthToken",
      "getBetAmountRuleID",
      "getRoadMap",
      "getStockUUIDByStockName",
      "getPortalProviderUUID"
    ]),
    // check bet close using stockOpenOrClosed and timer
    checkBetClose() {
      if (
        this.getTimerByStockName(this.stockID) &&
        this.getTimerByStockName(this.stockID).stockStatus === "Closed"
      ) {
        return true;
      }
      // check 1 or 5 loop
      if (this.getStockLoop(this.stockID) === 5) {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec ==
            240
        ) {
          this.clearDataMultiGameBet();
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 60
        );
      } else {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 40
        ) {
          this.clearDataMultiGameBet();
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 20
        );
      }
    }
  },
  methods: {
    ...mapActions([
      "setFooterBetAmount",
      "pushDataOnGoingBet",
      "clearDataMultiGameBet",
      "setLiveRoadMap",
      "setRoadMap",
      "setUserData"
    ]),

    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    stopListenSocket(channel) {
      console.log("stopListenSocket");
      window.Echo.leave(channel);
    },
    tabChanged(e) {
      switch (e) {
        case 0:
          this.trendType = "firstDigit";
          break;
        case 1:
          this.trendType = "lastDigit";

          break;
        case 2:
          this.trendType = "bothDigit";

          break;
        case 3:
          this.trendType = "twoDigit";

          break;
        default:
          alert("error");
      }
    },
    changeShowTrendMap() {
      this.isShowTrendMap = !this.isShowTrendMap;
    },
    //
    showBetDialog(rule, ruleid) {
      this.gameRule = rule;
      this.ruleid = ruleid;
      this.bettingDialog = true;
    },
    shipClick(value) {
      this.betAmount = this.betAmount + parseInt(value);
    },
    reviewbet() {
      this.reviewbetDialog = true;
    },
    placeBet() {
      let data = {
        gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
        ruleID: this.ruleid,
        betAmount: this.betAmount
      };
      console.log(data);
      this.confirmDisabled = true;
      this.sendBetting(data);
    },
    async sendBetting(betData) {
      try {
        const res = await this.$axios.$post(
          config.storeBet.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            version: config.version,
            betData: [betData]
          },
          {
            headers: config.header
          }
        );
        console.log(res);
        if (res.status && res.data[0].status) {
          this.setUserData();
          this.betAmount = 0;
          this.bettingDialog = false;
          this.reviewbetDialog = false;
          this.pushDataOnGoingBet(res.data[0]);
          this.$swal({
            type: "success",
            title: this.$root.$t("msg.confirm"),
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          if (res.status) {
            throw new Error(res.res.data[0].message);
          } else {
            throw new Error(res.message);
          }
        }
      } catch (ex) {
        this.confirmDisabled = false;
        this.$swal({
          type: "error",
          title: `Error ${ex.message}`,
          showConfirmButton: true
        });
        console.error(ex);
        // alert(ex.message);
      }
    },
    formatToPrice(value) {
      return `$ ${Number(value)
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
    // set payout
    gameRule() {
      let payoutArray1 = ["small", "big", "odd", "even"];
      let payoutArray2 = ["high", "mid", "low"];
      let payoutArray3 = ["firstdigit", "lastdigit", "bothdigit", "twodigit"];
      let array = this.gameRule.split("-");

      // check the last one is string or not
      // alert(parseInt(array[1]).isNaN)
      let firstArray = array[0];
      let lastArray = array[1];
      if (Number.isNaN(parseInt(lastArray))) {
        if (payoutArray1.includes(lastArray)) {
          this.odd = this.payout_big_small;
        } else if (payoutArray2.includes(lastArray)) {
          this.odd = this.payout_high_mid_low;
        } else {
          this.odd = "error";
        }
      } else {
        switch (firstArray) {
          case "firstdigit":
            this.odd = this.payout_09;
            break;
          case "lastdigit":
            this.odd = this.payout_09;
            break;
          case "bothdigit":
            this.odd = this.payout_18;
            break;
          case "twodigit":
            this.odd = this.payout_99;
            break;
          default:
            this.odd = "error";
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
h4 {
  font-size: 16px;
}

.text-size08 {
  padding: 0px 5px;
  font-size: 0.8em;
}

.lastdraw {
  font-size: 14px;
  border: 1px solid #4b65ff;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.betclose {
  font-size: 14px;
  border: 1px solid #ef076a;
  border-radius: 20px;
  padding: 6px 10px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.lottery {
  font-size: 14px;
  border: 1px solid #01e3bf;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.chartDesgin {
  margin-top: 10px;
  padding: 5px 5px;
  background-color: #fff;
  border-radius: 10px;
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
  border-radius: 20px;
  margin-top: 0px;
  color: #fff;
  background-color: #8291b2;
  text-align: center !important;
  font-size: 24px;
}

.setpricechip {
  position: relative;
  top: 0px;
  color: black;
  font-size: 0.85rem;
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

.text-color-blue {
  color: #2e477d;
  font-weight: bold;
}

.text-color-green {
  color: #17b542;
  font-weight: bold;
}
</style>
