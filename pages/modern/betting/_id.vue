<template>
<div>
    <v-layout style="margin: 0 0 -1% 0px;">
        <v-flex>
            <v-layout row wrap class="pt-1">
                <v-flex xs12 sm6>
                    <v-layout>
                        <v-flex class="text-xs-center">
                            <span class="uppercase-text grey--text">{{$t('msg.Lastdraw')}}:</span>
                            <v-flex flex-style class="lastdraw">
                                <h4 class="body-3" v-html="$options.filters.lastDraw(getStockById($route.params.id).lastDraw)"></h4>
                            </v-flex>
                        </v-flex>

                        <v-flex class="text-xs-center">
                            <span class="uppercase-text grey--text">{{$t('msg.BetClosein')}}:</span>
                            <v-flex flex-style class="betclose">
                                <h4 class="body-3 uppercase-text text-black">{{getLotteryDraw($route.params.id) | betclosein(getStockById($route.params.id).loop)}}</h4>
                            </v-flex>
                        </v-flex>

                        <v-flex class="text-xs-center">
                            <span class="uppercase-text grey--text">{{$t('msg.lotterydraw')}}:</span>
                            <v-flex flex-style class="lottery">
                                <h4 class="body-3 uppercase-text text-black">{{getLotteryDraw($route.params.id) | lotterydraw(getStockById($route.params.id).loop)}}</h4>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs7 sm6 md6 lg6>
                    <v-layout class=" pt-3">
                        <v-flex xs9 sm5 md6 lg7 class=" pr-2">
                            <v-btn class="buttonGreen">{{$t('msg.Game Mode')}}</v-btn>
                        </v-flex>

                        <v-flex xs3 sm7 md6 lg6 class=" pl-2">
                            <v-btn class="buttonGreen">
                                <nuxt-link to="/modern" class="text-white">{{$t('msg.otherstock')}}</nuxt-link>
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
                    <v-icon color="#003e70" v-show="isShowTrendMap" @click="changeShowTrendMap()">keyboard_arrow_left</v-icon>
                </v-flex>

                <v-flex v-if="isShowTrendMap" xs10 class="text-xs-center py-2">
                    <trendMap :dataArray="getRoadMap" :trendType="trendType" :isFullscreen="false" :key="getRoadMap[getRoadMap.length -1].stockTimestamp + trendType" :rowTable="4" :lop="30"></trendMap>
                </v-flex>

                <v-flex v-else xs10 class="text-xs-center">
                    <span>
                        <h3 class="text-uppercase">{{$t('stockname.'+getStockById($route.params.id).stockname)}}</h3>
                        <span class="text-primary">
                            <span>{{getStockById($route.params.id).loop}}</span> {{$t('msg.minute game')}} | ID:
                            <span>0909090</span>
                        </span>
                    </span>
                    <v-flex pa-2 xs12 class="chartDesgin">
                        <chartMobile :data="getStockById($route.params.id).stockPrice" :key="getStockById($route.params.id).stockPrice[0]"></chartMobile>
                    </v-flex>
                </v-flex>

                <v-flex xs1 align-self-center arrow>
                    <v-icon style="font-size:40px;" v-show="!isShowTrendMap" @click="changeShowTrendMap()" color="#003e70">keyboard_arrow_right</v-icon>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex>
            <div sm12 xs12 class="betClose" :style="$vuetify.breakpoint.xs ?  'width: 100%;':' width: 50%;'" v-if="checkBetClose  || getLotteryDraw($route.params.id) ==='close' || getLotteryDraw($route.params.id) == null ">
                <p>{{$t('msg.betclosed')}}</p>
            </div>
            <v-layout wrap sm6>
                <v-tabs grow centered style="width:100%;background-color: #f2f4ff;" @change="tabChanged($event)">
                    <v-tab class="firstdigit border-radius mr-1 ml-1">
                        <span class="text-pre-line text-white">{{$t('gamemsg.firstdigits')}}</span>
                    </v-tab>
                    <v-tab class="lastdigit border-radius mr-1 ml-1">
                        <span class="text-pre-line text-white">{{$t('gamemsg.lastdigits')}}</span>
                    </v-tab>
                    <v-tab class="bothdigit border-radius mr-1 ml-1">
                        <span class="text-pre-line text-white">{{$t('gamemsg.bothdigits')}}</span>
                    </v-tab>
                    <v-tab class="twodigit border-radius mr-1 ml-1">
                        <span class="text-pre-line text-white">{{$t('gamemsg.twodigits')}}</span>
                    </v-tab>

                    <!-- First Digit -->

                    <v-tab-item xs4>
                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('firstdigit-small')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-small'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.small')}}</h5>
                                    <span>0 TO 4</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('firstdigit-big')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-big'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.big')}}</h5>
                                    <span>5 TO 9</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('firstdigit-odd')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-odd'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.odd')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('firstdigit-even')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-even'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.even')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click.stop="drawerderfirst = !drawerderfirst">
                                <v-card-title class="o-even">
                                    <h5>0-9</h5>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('firstdigit-low')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-low'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.low')}}</h5>
                                    <span>0 TO 3</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('firstdigit-mid')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-mid'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.mid')}}</h5>
                                    <span>4 TO 6</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('firstdigit-high')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'firstdigit-high'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.high')}}</h5>
                                    <span>7 TO 9</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                    </v-tab-item>

                    <!-- last digit -->
                    <v-tab-item>
                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('lastdigit-small')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-small'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.small')}}</h5>
                                    <span>0 TO 4</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('lastdigit-big')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-big'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.big')}}</h5>
                                    <span>5 TO 9</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('lastdigit-odd')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-odd'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.odd')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('lastdigit-even')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-even'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.even')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click.stop="drawerderlast = !drawerderlast">
                                <v-card-title class="o-even">
                                    <h5>0-9</h5>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('lastdigit-low')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-low'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.low')}}</h5>
                                    <span>0 TO 3</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('lastdigit-mid')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-mid'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.mid')}}</h5>
                                    <span>4 TO 6</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('lastdigit-high')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'lastdigit-high'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.high')}}</h5>
                                    <span>7 TO 9</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                    </v-tab-item>

                    <!-- Both Digit -->
                    <v-tab-item>
                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('bothdigit-small')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-small'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.small')}}</h5>
                                    <span>0 TO 9</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('bothdigit-tie')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-tie'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.tie')}}</h5>
                                    <span>0</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('bothdigit-big')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-big'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.big')}}</h5>
                                    <span>9 TO 18</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('bothdigit-odd')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-odd'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.odd')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('bothdigit-even')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-even'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.even')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click.stop="drawerder018 = !drawerder018">
                                <v-card-title class="o-even">
                                    <h5>0-18</h5>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('bothdigit-low')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-low'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.low')}}</h5>
                                    <span>0 TO 5</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('bothdigit-mid')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-mid'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.mid')}}</h5>
                                    <span>6 to 11</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('bothdigit-high')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'bothdigit-high'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.high')}}</h5>
                                    <span>12 to 18</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                    </v-tab-item>

                    <!-- Both Digit -->

                    <!-- TWO Digit -->
                    <v-tab-item>
                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('twodigit-small')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-small'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.small')}}</h5>
                                    <span>00 TO 49</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('twodigit-tie')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-tie'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.tie')}}</h5>
                                    <span>0</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('twodigit-big')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-big'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.big')}}</h5>
                                    <span>50 TO 99</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('twodigit-odd')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-odd'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.odd')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('twodigit-even')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-even'})" />
                                <v-card-title class="o-even">
                                    <h5>{{$t('gamemsg.even')}}</h5>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click.stop="drawerder099 = !drawerder099">
                                <v-card-title class="o-even">
                                    <h5>00-99</h5>
                                </v-card-title>
                            </v-card>
                        </v-layout>

                        <v-layout row align-center justify-center>
                            <v-card class="box-click" @click="showBetDialog('twodigit-low')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-low'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.low')}}</h5>
                                    <span>0 TO 33</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('twodigit-mid')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-mid'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.mid')}}</h5>
                                    <span>34 to 66</span>
                                </v-card-title>
                            </v-card>

                            <v-card class="box-click" @click="showBetDialog('twodigit-high')">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:'twodigit-high'})" />
                                <v-card-title class="d-block">
                                    <h5>{{$t('gamemsg.high')}}</h5>
                                    <span>66 to 99</span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                    </v-tab-item>

                    <!-- TWO Digit -->
                </v-tabs>
            </v-layout>

            <div class="bettingFooter justify-center settotalbet sm10 xs10">
                <span class="text-size08">{{$t('msg.totalbet')}}: {{formatToPrice(getAllBettingAmount)}}</span>
            </div>
        </v-flex>
    </v-layout>

    <v-dialog v-model="bettingDialog" fullscreen hide-overlay transition="dialog-bottom-transition" light>
        <v-card tile color="#f4f6fd">
            <v-toolbar flat>
                <v-layout row>
                    <v-spacer></v-spacer>
                    <v-icon size="30" @click="bettingDialog=false">close</v-icon>
                </v-layout>
            </v-toolbar>

            <v-card class="mx-auto pa-2 round-3" :style="$vuetify.breakpoint.xs? 'width: 100%;' :'width: 60%;'" color="#ffffff">
                <v-flex xs12 class="text-center">
                    <div class="d-block text-center" style="color:#000">
                        <p class="text-uppercase">stockname : {{ $t(`stockname.${$route.params.id}`) }} payout: {{odd}}</p>
                        <p class="text-uppercase test-time-loop">{{getStockLoop($route.params.id)}} MINUTE GAME</p>
                        <p class="text-uppercase test-rule-betting">Betting On {{gameRule}}</p>
                    </div>
                </v-flex>

                <v-flex xs12 class="text-center">
                    <v-avatar size="60" v-for="(item,key) in imgChip" :key="key" @click="shipClick(getCoins_modern[key])">
                        <v-img class="ma-4" :src="item.img" :alt="item.title">
                            <span class="setpricechip">{{getCoins_modern[key]}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>

                <v-flex xs10 class="px-2 text-center ml-4 mt-3">
                    <input class="round-2 text-input" type="number" readonly label="$0" v-model="amount" />
                    <br />Max = $5000; MIN = $100
                </v-flex>

                <v-flex xs12 class="px-2 text-center mt-3">
                    <v-btn class="buttonGreen" @click="reviewbet()">review bet</v-btn>
                    <v-btn class="btn_cancel" @click="bettingDialog = false">cancel bet</v-btn>
                </v-flex>
            </v-card>
        </v-card>
    </v-dialog>
    <!-- price: "200" -->
    <!-- Review bet  -->
    <v-dialog v-model="reviewbetDialog" fullscreen hide-overlay transition="dialog-bottom-transition" light>
        <v-card tile color="#f4f6fd">
            <v-toolbar flat>
                <v-layout row>
                    <v-spacer></v-spacer>
                    <v-icon size="30" @click="reviewbetDialog=false">close</v-icon>
                </v-layout>
            </v-toolbar>

            <v-card class="mx-auto pa-2 round-3" :style="$vuetify.breakpoint.xs? 'width: 100%;' :'width: 60%;'" color="#ffffff">
                <v-flex xs12 class="text-center">
                    <div class="d-block text-center" style="color:#000">
                        <h2 class="text-color-blue">REVIEW YOUR BET</h2>
                        <p>Please confirm your bet below</p>
                    </div>
                </v-flex>
                <hr />
                <v-flex xs12 class="text-center">
                    <table class="table-review">
                        <tr>
                            <td class="text-right">Stock name:</td>
                            <td class="text-left pl-2 text-color-blue">{{ $t(`stockname.${$route.params.id}`) }}</td>
                        </tr>
                        <tr>
                            <td class="text-right">Game ID:</td>
                            <td class="text-left pl-2 text-color-blue">0909090</td>
                        </tr>
                        <tr>
                            <td class="text-right">Game Type:</td>
                            <td class="text-left pl-2 text-color-blue">{{getStockLoop($route.params.id)}} Minute game</td>
                        </tr>
                        <tr>
                            <td class="text-right">Betting on:</td>
                            <td class="text-left pl-2 text-color-blue">{{gameRule}}</td>
                        </tr>
                        <tr>
                            <td class="text-right">Payout:</td>
                            <td class="text-left pl-2 text-color-blue">1.95</td>
                        </tr>
                        <tr>
                            <td class="text-right">Amount:</td>
                            <td class="text-left pl-2 text-color-green">{{amount}}</td>
                        </tr>
                    </table>
                </v-flex>

                <v-flex xs12 class="px-2 text-center mt-3">
                    <v-btn class="buttonGreen" @click="placeBet">Place bet</v-btn>
                    <v-btn class="btn_cancel" @click="reviewbetDialog = false">cancel bet</v-btn>
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
                <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
            </div>
            <v-btn class="close" flat @click="drawerderfirst =! drawerderfirst">
                <v-icon size="30">close</v-icon>
            </v-btn>
        </v-layout>
        <hr class="head-jumbothron" />
        <v-container>
            <v-layout row wrap>
                <v-flex xs3 v-for="(item,index) in 10" :key="item" @click="showBetDialog(`firstdigit-${index}`)">
                    <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`firstdigit-${index}`})" />
                    <v-card-title class="box-click-modal o-even">
                        <h5>{{index}}</h5>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-container>
    </v-navigation-drawer>

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerderlast" fixed temporary>
        <v-layout row mt-5>
            <div class="d-block">
                <h3 class="text-uppercase">{{getStockById($route.params.id).stockname}}</h3>
                <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
            </div>
            <v-btn class="close" flat @click="drawerderlast =! drawerderlast">
                <v-icon size="30">close</v-icon>
            </v-btn>
        </v-layout>
        <hr class="head-jumbothron" />
        <v-container>
            <v-layout row wrap>
                <v-flex xs3 v-for="(item,index) in 10" :key="item" @click="showBetDialog(`lastdigit-${index}`)">
                    <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`lastdigit-${index}`})" />
                    <v-card-title class="box-click-modal o-even">
                        <h5>{{index}}</h5>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-container>
    </v-navigation-drawer>

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerder018" fixed temporary>
        <v-layout row mt-5>
            <div class="d-block">
                <h3 class="text-uppercase">{{getStockById($route.params.id).stockname}}</h3>
                <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
            </div>
            <v-btn class="close" flat @click="drawerder018 =! drawerder018">
                <v-icon size="30">close</v-icon>
            </v-btn>
        </v-layout>
        <hr class="head-jumbothron" />
        <v-container>
            <v-layout row wrap>
                <v-flex xs3 v-for="(item,index) in 19" :key="item" @click="showBetDialog(`bothdigit-${index}`)">
                    <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`bothdigit-${index}`})" />
                    <v-card-title class="box-click-modal o-even">
                        <h5>{{index}}</h5>
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
                            <v-flex xs3 v-for="(item,index) in 20" :key="item" @click="showBetDialog(`twodigit-${index < 10 ? '0' + index :index}`)">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`twodigit-${index < 10 ? '0' + index :index}`})" />
                                <v-card-title class="box-click-modal o-even">
                                    <h5>{{ index < 10 ? "0" + index :index}}</h5>
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
                            <v-flex xs3 v-for="(item,index) in 40" :key="item" v-show="item > 20" @click="showBetDialog(`twodigit-${index}`)">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`twodigit-${index}`})" />
                                <v-card-title class="box-click-modal o-even">
                                    <h5>{{index}}</h5>
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
                            <v-flex xs3 v-for="(item,index) in 60" :key="item" v-show="item > 40" @click="showBetDialog(`twodigit-${index}`)">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`twodigit-${index}`})" />
                                <v-card-title class="box-click-modal o-even">
                                    <h5>{{index}}</h5>
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
                            <v-flex xs3 v-for="(item,index) in 80" :key="item" v-show="item > 60" @click="showBetDialog(`twodigit-${index}`)">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`twodigit-${index}`})" />
                                <v-card-title class="box-click-modal o-even">
                                    <h5>{{index}}</h5>
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
                            <v-flex xs3 v-for="(item,index) in 100" :key="item" v-show="item > 80" @click="showBetDialog(`twodigit-${index}`)">
                                <showChipAmount text-center size="35px" :amount="getAmountMultiGameBet({stockId:getStockId($route.params.id) ,gameRule:`twodigit-${index}`})" />
                                <v-card-title class="box-click-modal o-even">
                                    <h5>{{index}}</h5>
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
import {
    mapGetters,
    mapMutations,
    mapActions
} from "vuex";
import chartMobile from "~/components/chartMobile";
import payout from "~/data/payout";
import showChipAmount from "~/components/modern/showChipAmount";
import trendMap from "~/components/modern/trendMap";

export default {
    async validate({
        params,
        store
    }) {
        return store.getters.getCheckStock(params.id);
    },
    data() {
        return {
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
            imgChip: [{
                    title: "Danger",
                    img: "/chip/danger.png"
                },
                {
                    title: "Primary",
                    img: "/chip/primary.png"
                },
                {
                    title: "success",
                    img: "/chip/success.png"
                },
                {
                    title: "warning",
                    img: "/chip/warning.png"
                },
                {
                    title: "black",
                    img: "/chip/black.png"
                }
            ],
            odd: null,
            gameRule: "null",
            amount: 0,
            confirmDisabled: false
        };
    },
    mounted() {
        this.stockID = this.$route.params.id;
        this.asyncRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
        // socket new api
        this.listenForBroadcast({
                channelName: `roadMap.${this.getStockUUIDByStockName(this.$route.params.id)}.${this.getPortalProviderUUID}`,
                eventName: "roadMap"
            },
            ({
                data
            }) => {
                // console.log("new socket success");
                // console.log(data.data.roadMap);
                this.setLiveRoadMap(data.data.roadMap[0]);
                // console.log("new socket success");
            }
        );
    },
    components: {
        chartMobile,
        trendMap,
        showChipAmount
    },
    computed: {
        ...mapGetters([
            "getStockById",
            "getLiveTime",
            "getLotteryDraw",
            "getCheckStock",
            "getStockLoop",
            "getCoins_modern",
            "getStockLoop",
            "getStockCrawlerData",
            "getAllBettingAmount",
            "getStockId",
            "getAuth_token",
            "getAmountMultiGameBet",
            "getRoadMap",
            "getStockUUIDByStockName",
            "getPortalProviderUUID"
        ]),
        checkBetClose() {
            if (this.getStockLoop(this.$route.params.id) == 1) {
                if (this.getLotteryDraw(this.$route.params.id) == 40) {
                    this.clearDataMultiGameBet();
                }
                return this.getLotteryDraw(this.$route.params.id) > 40;
            } else {
                if (this.getLotteryDraw(this.$route.params.id) == 240) {
                    this.clearDataMultiGameBet();
                }
                return this.getLotteryDraw(this.$route.params.id) > 240;
            }
        }
    },
    methods: {
        ...mapActions(["balance", "asyncRoadMap"]),
        ...mapMutations([
            "setFooterBetAmount",
            "pushDataOnGoingBet",
            "clearDataMultiGameBet",
            "setLiveRoadMap"
        ]),
        listenForBroadcast({
            channelName,
            eventName
        }, callback) {
            window.Echo.channel(channelName).listen(eventName, callback);
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
        showBetDialog(rule) {
            this.gameRule = rule;
            this.bettingDialog = true;
        },
        shipClick(value) {
            this.amount = this.amount + parseInt(value);
        },
        reviewbet() {
            this.reviewbetDialog = true;
        },
        placeBet() {
            let data = {
                stockId: this.getStockId(this.$route.params.id),
                loop: this.getStockLoop(this.$route.params.id),
                gameRule: this.gameRule,
                amount: this.amount
            };
            this.confirmDisabled = true;
            this.sendBetting(data);
            // console.warn(this.getOnBetting);
        },
        async sendBetting(betData) {
            let data = {
                data: [betData]
            };
            try {
                const res = await this.$axios.$post(
                    `/api/storebet?apikey=${this.getAuth_token}`,
                    data
                );
                // console.log(res);
                if (res.status) {
                    this.balance();
                    // console.warn(res.data[0]);
                    this.bettingDialog = false;
                    this.reviewbetDialog = false;
                    this.pushDataOnGoingBet(res.data[0]);
                    // console.warn(this.getOnBetting);
                    this.$swal({
                        type: "success",
                        title: "Confirm!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.confirmDisabled = false;
                    this.$swal({
                        type: "error",
                        title: `Error ${res.message}`,
                        showConfirmButton: true
                    });
                }
            } catch (ex) {
                this.confirmDisabled = false;
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
