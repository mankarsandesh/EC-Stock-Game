<template>
<div>
    <div v-if="$route.params.id.split('-')[3] == 'currentbet'">
        <currentbet />
    </div>
    <div v-else-if="$route.params.id.split('-')[3] == 'history'">
        <history />
    </div>
    <div v-else-if="$route.params.id.split('-')[3] == 'gameresult'">
        <gameresult />
    </div>
    <div v-else-if="$route.params.id.split('-')[3] == 'announcement'">
        <announcement />
    </div>
    <div v-else-if="$route.params.id.split('-')[3] == 'rule'">
        <rule />
    </div>
    <div v-else-if="$route.params.id.split('-')[3] == 'setting'">
        <setting />
    </div>

    <div v-else>
        <!-- {{balance - sumTotalAll}} -->
        <v-tabs class="bg-colors" v-model="currentItem" color="transparent" fixed-tabs slider-color="yellow" grow>
            <v-tab class="text-sm-left text-whites" v-for="(item, idx1) in items" :key="idx1" :href="'#tab-' + item.name">{{ $t('gamemsg.'+item.name )}}</v-tab>
        </v-tabs>

        <v-card v-if="!$vuetify.breakpoint.smAndDown">
            <v-layout row wrap style="padding: 12px 0px 0px;">
                <v-flex xs12 md7 mt-1>
                    <v-checkbox style="float:left;margin:5px 10px;" :label="$t('msg.preset')" ></v-checkbox>
                    <!-- <input type="checkbox" /> <label> {{$t('msg.preset')}} </label> -->
                    <button class="btn-preset">{{$t('msg.amount')}}</button>
                    <input readonly type="text" class="form-input width-30" v-model="price" />
                    <button class="btn-reset" type="reset" @click="setPrice('reset')">{{$t('msg.reset')}}</button>
                    <v-btn @click="setPrice('confirm')" color="error" :disabled="this.betData.betdetails.length == '0'">{{$t('msg.confirm')}}</v-btn>
                </v-flex>
<<<<<<< HEAD
                <v-flex xs12 md5>
                    <v-avatar :class="balance < chip.price ? 'pointer-events-none':''" size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img class="cursor-pointer" :src="chip.img" :disabled="balance < chip.price" @click="setPrice($event)" :name="chip.name">
=======
                <v-flex xs12 md6>
                    <v-avatar :class="balance - sumTotalAll < chip.price ? 'pointer-events-none':''" size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img class="cursor-pointer" :src="chip.img" :disabled="balance - sumTotalAll < chip.price" @click="setPrice($event)" :name="chip.name">
>>>>>>> 1e4c279a0d9f279f8f140f3ff5c614b2816f8d6a
                            <span class="btn-chips">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-card>

        <v-card v-if="disabled">
            <v-layout row>
                <v-flex xs12 md12 :class="currentItem == 'tab-All games'? 'bet-closed set-closed' : ' bet-closed set-closeds'">
                    <span class="bet-closed-text text-closed">{{$t('msg.betclosed')}}</span>
                </v-flex>
            </v-layout>
        </v-card>

        <!-- form type bet -->
        <v-tabs-items v-model="currentItem">
            <v-tab-item v-for="(item, idx3) in items" :disabled="disabled" :key="idx3" :value="'tab-' + item.name">
                <v-card flat>
                    <v-expansion-panel v-model="panel" expand>
                        <v-expansion-panel-content class="bg-color" v-for="(items, idx4) in item.children" :key="idx4">
                            <template v-slot:header>
                                <div>{{$t('gamemsg.'+items.name)}}</div>
                            </template>
                            <v-card>
                                <v-layout row>

                                    <!-- FIRST DIGIT & LAST DIGIT -->
                                    <v-flex xs12 md6>
                                        <table>
                                            <tr>
                                                <th class="header-bet" v-if="items.name == 'Specific-Number' && data !=='bothdigit'  && data !=='twodigit'" :style="items.name == 'Specific-Number'  ? 'width:50%':'width:50%'" v-for="(data, idx6) in header" :key="idx6">{{$t('gamemsg.'+data)}}</th>
                                                <th class="header-bet" v-if="items.name !== 'Specific-Number' && data !=='bothdigit' && data !=='twodigit'" :style="items.name == 'Specific-Number'  ? 'width:50%':'width:50%'" v-for="(data, idx7) in header" :key="idx7">{{$t('gamemsg.'+data)}}</th>
                                            </tr>

                                            <tr v-for="(datas, idx5) in items.childrens" :key="idx5">
                                                <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:50%':'width:50%'" @click="betRow($event)">
                                                    <div class="text-bet">{{datas.name >= 0 ? datas.name: $t('gamemsg.'+datas.name)}}</div>
                                                    <div class="text-stock">{{items.payout}} </div>
                                                    <div class="bet-box">
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[0]+'-'+datas.name" />
                                                    </div>
                                                </td>

                                                <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:50%':'width:50%'" @click="betRow($event)">
                                                    <div class="text-bet">{{datas.name2 >= 0 ? datas.name2: $t('gamemsg.'+datas.name2)}}</div>
                                                    <div class="text-stock">{{items.payout}}</div>
                                                    <div class="bet-box">
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[1]+'-'+datas.name2" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </v-flex>

                                    <!-- BOTH DIGIT & TWO DIGIT -->
                                    <v-flex xs12 md6>
                                        <table>
                                            <tr>
                                                <th class="header-bet" v-if="items.name == 'Specific-Number' && data !=='firstdigit'  && data !=='lastdigit'" :style="items.name == 'Specific-Number' && data=='bothdigit' ? 'width:70%':'width:30%'" v-for="(data, idx6) in header" :key="idx6">{{$t('gamemsg.'+data)}}</th>
                                                <th class="header-bet" v-if="items.name !== 'Specific-Number' && data !=='firstdigit' && data !=='lastdigit'" :style="items.name == 'Specific-Number' && data=='bothdigit' ? 'width:30%':'width:50%'" v-for="(data, idx7) in header" :key="idx7">{{$t('gamemsg.'+data)}}</th>
                                            </tr>

                                            <tr v-for="(datas, idx5) in items.childrens" :key="idx5">
                                                <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:35%':'width:50%'" @click="betRow($event)" v-if="datas.childrenss" v-for="(datass) in datas.childrenss">
                                                    <div class="text-bet">{{datass.name}}</div>
                                                    <div class="text-stock">{{items.payoutb}}</div>
                                                    <div class="bet-box">
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datass.name" style="width:80%;" />
                                                    </div>
                                                </td>

                                                <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:35%':'width:50%'" @click="betRow($event)" v-if="datas.childrenss" v-for="(datass, idx9) in datas.childrenss" :key="idx9">
                                                    <div class="text-bet" v-if="datass.name2 != 19">{{datass.name2}}</div>
                                                    <div class="text-stock" v-if="datass.name2 != 19">{{items.payoutb}}</div>
                                                    <div class="bet-box" v-if="datass.name2 != 19">
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datass.name2" style="width:80%;" />
                                                    </div>
                                                </td>

                                                <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:35%':'width:50%'" v-if="!datas.childrenss" @click="betRow($event)">
                                                    <div class="text-bet">{{$t('gamemsg.'+datas.name3)}}</div>
                                                    <div class="text-stock">{{items.payout}}</div>
                                                    <div class="bet-box">
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datas.name3"  />
                                                    </div>
                                                </td>

                                                <td class="top-bet" v-if="items.name !== 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:35%':'width:50%'" @click="betRow($event)">
                                                    <div class="text-bet">{{$t('gamemsg.'+datas.name4)}}</div>
                                                    <div class="text-stock">{{items.payout}}</div>
                                                    <div class="bet-box" >
                                                        <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[3]+'-'+datas.name4"     />
                                                    </div>
                                                </td>

                                                <td class="top-bet" v-if="items.name == 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:30%':'width:40%'">
                                                    <div class="text-bet" >{{datas.name4}} </div>
                                                    <div class="bet-box">
                                                        <button class="form-btn" @click="getsnTwo(datas.name4)"  />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </v-flex>

                                </v-layout>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <!-- end form typy bet -->
        <v-card v-if="!$vuetify.breakpoint.smAndDown">
            <v-layout row wrap>
                <v-flex xs12 md7 mt-1>
                    <v-checkbox style="float:left;margin:5px 10px;" :label="$t('msg.preset')" ></v-checkbox>
                    <!-- <input type="checkbox" />
                    {{$t('msg.preset')}} -->
                    <button class="btn-preset">{{$t('msg.amount')}}</button>
                    <input readonly type="text" class="form-input width-30" v-model="price" />
                    <button class="btn-reset" type="reset" @click="setPrice('reset')">{{$t('msg.reset')}}</button>
                    <v-btn @click="setPrice('confirm')" color="error" :disabled="this.betData.betdetails.length == '0'">{{$t('msg.confirm')}}</v-btn>
                </v-flex>
                <v-flex xs12 md5 >
                    <v-avatar size="60" :class="balance < chip.price ? 'pointer-events-none':''" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img class="cursor-pointer" :src="chip.img" :disabled="balance < chip.name" @click="setPrice($event)" :name="chip.name">
                            <span class="btn-chips">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-card>

        <v-tabs class="bg-colors" v-model="currentItems" color="transparent" fixed-tabs slider-color="yellow" grow>
            <v-tab class="text-sm-left text-whites" @click="loadchart()" v-for="(baccarat1, idx1) in baccarat" :key="idx1" :href="'#tab-' + baccarat1.name">{{ $t('gamemsg.'+baccarat1.name) }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentItems">
            <v-tab-item v-for="(baccarat1, idx3) in baccarat" :key="idx3" :value="'tab-' + baccarat1.name">
                <v-card flat>
                    <v-tabs class="bg-colors" v-model="currentItemss" color="transparent" fixed-tabs slider-color="yellow" grow>
                        <v-tab class="text-sm-left text-whites" @click="loadchart()" v-for="(baccarat2, idx11) in baccarat1.children" :key="idx11" :href="'#' + baccarat2.name">{{ $t('gamemsg.'+baccarat2.name) }}</v-tab>
                    </v-tabs>
                    <baccarats :chtable="baccarat1.namech" :chlists="baccarat1.namech+'-'+currentItemss" :dataArray="getStockNewData($route.params.id)" :stocks="stocks" />
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <v-dialog v-model="dialog" persistent max-width="1240px">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button class="cancel" @click="dialog = false">X</button>
                </v-card-actions>
                <v-card-text>
                    <v-card>
                        <button class="btn-preset">{{$t('msg.amount')}}</button>
                        <input readonly type="text" class="form-input width-15" v-model="price" />
                        <button class="btn-reset" type="reset" @click="setPrice('reset')">{{$t('msg.reset')}}</button>
                        <v-avatar size="60" :class="balance - sumTotalAll < chip.price ? 'pointer-events-none':''" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                            <v-img class="cursor-pointer" :src="chip.img" :disabled="balance - sumTotalAll < chip.name" @click="setPrice($event)" :name="chip.name">
                                <span class="btn-chips">{{chip.price}}</span>
                            </v-img>
                        </v-avatar>
                    </v-card>
                    <table>
                        <tr>
                            <th class="header">{{$t('msg.gamerule')}}</th>
                            <th class="header">{{$t('msg.payout')}}</th>
                            <th class="header">{{$t('msg.amount')}}</th>
                            <th class="header">
                                <span class="cursor-pointer" flat @click="setPrice('reset')">{{$t('msg.deleteall')}}
                                    <v-icon size="18" color="white">delete</v-icon>
                                </span>
                            </th>
                        </tr>
                        <tr v-for="(data ,idx11) in betDataShows" :key="idx11">
                            <td>{{data.gameRule.split("-")[1] >= 0 ? $t('gamemsg.'+data.gameRule.split("-")[0])+' - '+data.gameRule.split("-")[1]: $t('gamemsg.'+data.gameRule.split("-")[0])+' - '+$t('gamemsg.'+data.gameRule.split("-")[1])}}</td>
                            <td>{{data.payout}}</td>
                            <td>
                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :name="data.gameRule" :value="data.amount" />
                            </td>
                            <td>
                                <v-btn flat icon color="red" @click="deleteTodo(idx11)">
                                    <v-icon size="20">delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                {{$t('msg.totalbet')}} :
                                <span class="text-waring">{{this.betData.betdetails.length}}</span>
                            </td>
                            <td colspan="2" class="text-left">
                                {{$t('msg.totalamount')}} :
                                <input class="text-success total" :value="sumTotalAll" />
                            </td>
                        </tr>
                    </table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="dialog = false, getConfirmBet()" :disabled="this.betData.betdetails.length == '0'">{{$t('msg.ok')}}</v-btn>
                    <v-btn color="error" @click="dialog = false , isfooter = true">{{$t('msg.cancel')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- tag loop two digit -->
        <v-dialog v-model="dialogtwo" persistent max-width="440px">
            <v-card>
                <v-card-text>
                    <v-avatar :size="$vuetify.breakpoint.smAndDown ? 45:60" :class="balance - sumTotalAll < chip.price ? 'pointer-events-none':''" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img class="cursor-pointer" :src="chip.img" :disabled="balance - sumTotalAll < chip.name" @click="setPrice($event)" :name="chip.name">
                            <span class="btn-chips">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                    <table>
                        <tr>
                            <th>{{$t('gamemsg.twodigit')}} </th>
                        </tr>
                        <tr v-if="sntwoloopstart == 0">
                            <td class="top-bet" @click="betRow($event)">
                                <div class="text-bet">00</div>
                                <div class="text-stock">98.82</div>
                                <div class="bet-box">
                                    <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[3]+'-00'" />
                                </div>
                            </td>
                        </tr>
                        <tr v-for=" (data, idx12) in sntwoloopend" v-if="data >= sntwoloopstart" :key="idx12">
                            <td class="top-bet" @click="betRow($event)">
                                <div class="text-bet">{{ 10 > sntwoloopstart ? '0'+data : data}}</div>
                                <div class="text-stock">98.82</div>
                                <div class="bet-box">
                                    <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="10 > sntwoloopstart ? header[3]+'-0'+data : header[3]+'-'+data" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialogtwo = false">{{$t('msg.cancel')}}</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialogtwo = false">{{$t('msg.ok')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <!-- alertOutCome -->
    <v-snackbar class="tops" v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
        <span class="text-center">
            <h2>{{text}}</h2>
            <h2>
                <animated-number :value="betPrice" :formatValue="formatToPrice" />
            </h2>
        </span>
    </v-snackbar>
    <!-- end alertOutCome -->

    <!-- alertOutCome -->
    <v-snackbar class="tops" v-model="alertSS" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
        <span class="text-center">
            <h2>{{alertext}}</h2>
        </span>
    </v-snackbar>
    <!-- end alertOutCome -->
    <div class="mb-footer" v-show="$vuetify.breakpoint.smAndDown && ($route.params.id.split('-')[3] == null || $route.params.id.split('-')[3] == '')">
        <chipfooter v-show="isfooter" />

    </div>

</div>
</template>

<script>
import currentbet from "./current-bet";
import history from "./history";
import gameresult from "./game-result";
import announcement from "./announcement";
import rule from "./rule";
import setting from "./setting";

import baccarats from "~/components/classic/baccarats";
import chipfooter from "~/components/classic/chipfooter";
import table from "~/data/json/table.json";
import chips from "~/data/json/chips.json";
import baccarat from "~/data/json/baccarat.json";
import openSocket from "socket.io-client";
import AnimatedNumber from "animated-number-vue";
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";
export default {
    layout: "classic",
    async validate({
        params,
        store
    }) {
        return store.getters.getStockName(params.id);
    },

    components: {
        AnimatedNumber,
        baccarats,
        currentbet,
        history,
        gameresult,
        announcement,
        rule,
        setting,
        chipfooter
    },

    data() {
        return {
            isfooter: true,
            currentItem: "tab-All games",
            currentItems: "tab-Big-Small",
            currentItemss: null,
            header: ["firstdigit", "lastdigit", "bothdigit", "twodigit"],
            // panel: [false, false, false, false],
            panel: [true, true, true, true],
            chips: [],
            items: table,
            baccarat: baccarat,
            chipsReset: chips,
            price: 0,
            betData: {
                betdetails: [],
                betName: []
            },
            betDataShows: [],
            dialog: false,
            dialogtwo: false,
            balance: 0,
            sntwoloopstart: null,
            sntwoloopend: null,
            stockname: "",
            stocks: this.$route.params.id.split("-")[1],
            show1: true,
            checkbox1: false,

            // alertOutCome
            alertSS: false,
            snackbar: false,
            y: "top",
            x: null,
            mode: "vertical",
            timeout: 3000,
            text: "",
            color: "",
            betPrice: 0,
            alertext: "",
            disabled: false,
            // end alertOutCome,
        };
    },

    mounted() {
        // console.log(this.getStockName(this.$route.params.id).loop)
        this.getTime();
        this.getchips();
        this.settabs()
        this.getSotckId()
        this.getMbFooter()
    },
    created() {
        this.getbalance()
    },
    computed: {
        ...mapGetters(["getStockName", "getStockNewData"]),
        sumTotalAll() {
            let total = 0;
            if (this.betData.betdetails.length >= 0) {
                for (let i = 0; i < this.betData.betdetails.length; i++) {
                    total += this.betData.betdetails[i].amount;
                }
                return total;
            } else {
                return 0;
            }

        },
        formData() {
            return {
                data: this.betData.betdetails,
            };
        }

    },
    methods: {
        settabs() {
            let t = this.$route.params.id.split("-")[2]
            let s;
            if (t == 'bsf' || t == 'oef' || t == 'live') s = "firstdigit";
            else if (t == 'bsl' || t == 'oel') s = "lastdigit";
            else if (t == 'bsb' || t == 'oeb') s = "bothdigit";
            else if (t == 'bst' || t == 'oet') s = "twodigit";

            t = t.split("")[0] + '' + t.split("")[1]
            if (t == 'oe') t = "tab-Odd-Even";
            else if (t == 'bs') t = "tab-Big-Small";
            else t = "tab-All games";

            this.currentItem = t
            this.currentItems = t
            this.currentItemss = s
            return;
        },
        async getbalance() {
            let balance = await this.$axios.$get('/api/me?apikey=' + this.$store.state.auth_token)
            this.balance = balance.userBalance
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get('/api/fetchStockOnly?apikey=' + this.$store.state.auth_token)
            stcokId.data.forEach(element => {
                if (element.stockName == this.$route.params.id.split("-")[1]) {
                    this.stockname = element.stockId
                }
            })
        },
        async getConfirmBet() {
            if (this.sumTotalAll > this.balance || this.sumTotalAll == '') {
                this.getalertstartstop('error')
            } else {
                this.$store.state.balance = this.balance = this.balance - this.sumTotalAll;
                // console.log(this.formData);
                console.log("send to api server");
                const res = await this.$axios.post("/api/storebet?apikey=" + this.$store.state.auth_token, this.formData)
                console.log(res)
                setTimeout(() => {
                    this.getalertstartstop(res.data)
                    this.setPrice("reset");
                    $(".getupdatebalance")[0].click()
                    $("#txtbalance").text(this.formatToPrice(this.balance))
                }, 700);
            }
        },

        getchips() {
            if (localStorage.chips == null) {
                localStorage.chips = JSON.stringify(this.chipsReset);
                this.chips = JSON.parse(localStorage.chips);
            } else {
                this.chips = JSON.parse(localStorage.chips);
            }
        },

        loadchart() {
            this.show1 = false;
            setTimeout(() => {
                this.show1 = true;
            }, 10);
        },

        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        formatTotal(value) {
            return `$ ${Number(value)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },

        getsnTwo(val) {
            this.dialogtwo = true;
            this.sntwoloopstart = parseInt(val.split("-")[0]);
            this.sntwoloopend = parseInt(val.split("-")[1]);
        },

        deleteTodo(index) {
            this.betData.betdetails.splice(index, 1);
            this.betDataShows.splice(index, 1);
        },

        setPricetop(e) {
            this.price += parseInt(e.target.textContent);
        },

        setPrice(e) {
            if (e == "reset") {
                this.betData.betdetails = [];
                this.betDataShows = [];
                this.betData.betName = [];
                this.price = null;
                $("#txttotal").text(this.formatTotal(this.price))
                $(".form-input").val("");
                $(".form-inputadd").val("");
                $(".form-inputadd").attr("class", "form-input");
                $(".top-betadd").attr("class", "top-bet");
                this.isfooter = true;
            } else if (e == "confirm") {
                this.dialog = true;
                this.isfooter = false;

            } else {
                // console.log(e.target.textContent)
                if (e > 0) this.price += parseInt(e);
                else this.price += parseInt(e.target.parentElement.innerText);
                $("#txttotal").text(this.formatTotal(this.price))
                $(".form-inputadd").val(this.price);
                if (this.betData.betName.length > 0) {
                    for (let i = 0; i < this.betData.betName.length; i++) {
                        this.bet(e, this.betData.betName[i]);
                    }
                }
            }
        },

        betRow(e) {
            // console.log(e);
            if (e.target.parentElement.className == "top-bet") {
                e.target.parentElement.children[2].children[0].value = this.price;
                e.target.parentElement.className = "top-betadd";
                e.target.parentElement.children[2].children[0].className =
                    "form-inputadd";

                this.betData.betName.push({
                    gameRule: e.target.parentElement.children[2].children[0].name,
                    stockId: e.target.parentElement.children[2].children[0].dataset.stock,
                    payout: e.target.parentElement.children[1].innerText
                });

                if (this.betData.betName.length > 0) {
                    for (let i = 0; i < this.betData.betName.length; i++) {
                        this.bet(e, this.betData.betName[i]);
                    }
                }
            } else if (e.target.parentElement.className == "top-betadd") {
                e.target.parentElement.children[2].children[0].value = "";
                e.target.parentElement.className = "top-bet";
                e.target.parentElement.children[2].children[0].className = "form-input";
                let index = this.betData.betName.indexOf(this.betData.betName);
                if (index !== -1) this.betData.betName.splice(index, 1);
                if (index !== -1) this.betData.betdetails.splice(index, 1);
                if (index !== -1) this.betDataShows.splice(index, 1);
            }
            // console.log(this.betData.betName);
        },

        bet(e, specialName = "none") {
            // this.playSound('/voice/bet-chips.mp3') 
            if (this.price == 0 || this.price == null || this.price > this.balance - this.sumTotalAll) {
                // console.log("Null-0");
                this.price = 0
                this.getalertstartstop("notenough")
                return;
            }
            
            if (e.target.value !== "") {
                e.target.value = parseInt(e.target.value) + parseInt(this.price);
            } else {
                e.target.value = this.price;
            }
            this.loop = this.getStockName(this.$route.params.id).loop;

            // Data send to server
            if (specialName !== "none") {
                this.gameRule = specialName.gameRule;
                this.stockId = specialName.stockId;
                this.amount = this.price;
            } else {
                this.gameRule = e.target.name;
                this.stockId = e.target.dataset.stock;
                this.payout =
                    e.target.parentElement.parentElement.children[1].innerText;
                this.amount = parseInt(e.target.value);
            }

            this.index = this.betData.betdetails.findIndex(x => x.gameRule === this.gameRule);
            if (this.index == -1) {
                this.betData.betdetails.push({
                    gameRule: this.gameRule,
                    stockId: this.stockId,
                    amount: this.amount,
                    loop: this.loop
                });
            } else {
                this.betData.betdetails[this.index].amount = this.amount;
            }
            // console.log(this.betData.betdetails)
            // End data send to server

            // Data Show clients
            if (specialName !== "none") {
                this.gameRule = specialName.gameRule;
                this.stockId = specialName.stockId;
                this.payout = specialName.payout;
                this.amount = this.price;
            } else {
                this.gameRule = e.target.name;
                this.stockId = e.target.dataset.stockId;
                this.payout =
                    e.target.parentElement.parentElement.children[1].innerText;
                this.amount = parseInt(e.target.value);
            }

            this.index = this.betDataShows.findIndex(x => x.gameRule === this.gameRule);
            if (this.index == -1) {
                this.betDataShows.push({
                    gameRule: this.gameRule,
                    stockId: this.stockId,
                    payout: this.payout,
                    amount: this.amount,
                    loop: this.loop
                });
            } else {
                this.betDataShows[this.index].amount = this.amount;
            }
            // End  data Show clients
            // console.log(this.betDataShows);
        },

        getTime() {
            const socket = openSocket("https://websocket-timer.herokuapp.com");
            socket.on("time", data => {
                let times, calculating, alert;
                if (this.$route.params.id.split("-")[1] == "btc1") {
                    times = data.btc1.timer;
                    calculating = 41;
                    alert = 60;
                } else if (this.$route.params.id.split("-")[1] == "btc5") {
                    times = data.btc5.timer;
                    calculating = 241;
                    alert = 300;
                } else if (this.$route.params.id.split("-")[1] == "usindex") {
                    times = data.usindex.timer;
                    calculating = 241;
                    alert = 300;
                } else {
                    times = data.sh000001.timer;
                    calculating = 241;
                    alert = 300;
                }

                if (times > calculating) {
                    this.getBetClosedopen('closed');
                } else if (times == "close") {
                    this.getBetClosedopen('closed');
                } else if (times == calculating) {
                    this.getBetClosedopen('open');
                }

                // if (times == alert) {
                //     this.getalertstartstop("stop")
                // } else if (times == calculating) {
                //     this.getalertstartstop("start")
                // }

                if (times == calculating - 3) {
                    this.alertOutCome()
                }
            });
        },

        getBetClosedopen(val) {
            if (val == 'closed') {
                this.panel = [false, false, false, false];
                this.setPrice("reset");
                this.disabled = true
                this.dialog = false
            } else {
                this.panel = [true, true, true, true];
                this.disabled = false
            }

        },

        async alertOutCome() {
            let totalPayout = await this.$axios.$get('/api/me/totalPayout?apikey=' + this.$store.state.auth_token)
            // console.log(totalPayout)
            if (totalPayout.status == false) return;
            this.snackbar = true;
            $(".getupdatebalance")[0].click()
            this.getbalance()
            this.betPrice = totalPayout.data
            if (totalPayout.data > 0) {
                this.text = this.$root.$t('msg.winbet');
                this.color = "#2962FF";
                this.playSound('/voice/winbet.mp3')
            } else {
                this.text = this.$root.$t('msg.losebet');
                this.color = "#D50000";
            }
        },

        getalertstartstop(val) {

            this.alertSS = true;
            if (val == "start") {
                this.alertext = this.$root.$t('msg.startbetting')
                this.color = "#2962FF";
                this.$vuetify.goTo(0)
            } else if (val == "stop") {
                this.alertext = this.$root.$t('msg.stopbetting')
                this.color = "#D50000";
            } else if (val.status == true) {
                this.alertext = this.$root.$t('msg.confirmed')
                this.color = "success";
            } else if (val.status == false) {
                this.alertext = this.$root.$t('msg.moneynotenough') + "\n" + val.message;
                this.color = "error";
            } else if (val == "notenough") {
                this.alertext = this.$root.$t('msg.moneynotenough');
                this.color = "error";
            }
        },
        playSound(sound) {
            if (sound) {
                let audio = new Audio(sound);
                audio.play();
            }
        },
        getMbFooter() {
            $("#txttotal").text(this.formatTotal(this.price))
            $("#ch10").text(this.chips[0].price)
            $("#ch50").text(this.chips[1].price)
            $("#ch100").text(this.chips[2].price)
            $("#ch500").text(this.chips[3].price)
            $("#ch1000").text(this.chips[4].price)
            $("#ch5000").text(this.chips[5].price)

            $("#path-3,#btnCONFIRM").click(() => {
                if (this.betData.betdetails.length == '0') return
                this.setPrice('confirm')
            });
            $("#Rectangle,#btnCANCEL").click(() => {
                this.setPrice("reset");
            });
            $("#chips, #ch10").click(() => {
                if (this.balance >= parseInt(this.chips[0].price))
                    this.setPrice(this.chips[0].price)
            });
            $("#OS93GB1we-copy, #ch50").click(() => {
                if (this.balance >= parseInt(this.chips[1].price))
                    this.setPrice(this.chips[1].price)
            });
            $("#OS93GB2, #ch100").click(() => {
                if (this.balance >= parseInt(this.chips[2].price))
                    this.setPrice(this.chips[2].price)
            });
            $("#OS93GB1-copy, #ch500").click(() => {
                if (this.balance >= parseInt(this.chips[3].price))
                    this.setPrice(this.chips[3].price)
            });
            $("#OS93GB5-copy, #ch1000").click(() => {
                if (this.balance >= parseInt(this.chips[4].price))
                    this.setPrice(this.chips[4].price)
            });
            $("#OS93GB3a-copy-copy, #ch5000").click(() => {
                if (this.balance >= parseInt(this.chips[5].price))
                    this.setPrice(this.chips[5].price)
            });
        }
    }
};
</script>

<style>
.mb-footer {
    margin-left: -1.5%;
    position: fixed;
    left: 0;
    bottom: -2%;
    width: 102%;
    text-align: center;
    z-index: 150;
}

.cursor-pointer {
    cursor: pointer;
}

.cursor-pointer:hover {
    transition-delay: 0.1s;
    transition-duration: 0.1s;
    cursor: pointer;
    background-color: #00ddfff2;
    transform-origin: center;
}

.pointer-events-none {
    text-align: center;
    margin-bottom: 10px;
    pointer-events: none;
    background-color: rgb(88, 88, 88);
}

.bet-closed {
    position: absolute;
    text-align: center;
    background-color: white;
    z-index: 20;
    opacity: 0.7;
    width: 100%;
}

.bet-closed-text {
    font-size: 3.3rem;
    color: red;
    top: 5%;
    text-transform: capitalize;
}

.set-closed {
    height: calc(20vh - 62px);
    padding-top: 5%;
}

.set-closeds {
    height: calc(20vh - 215px);
    padding-top: 0%;
}

.btn-chips {
    top: 32%;
    position: relative;
    cursor: pointer;
    font-size: 0.9rem;
}

.cancel {
    width: 2%;
}

.text-success {
    color: green;
    font-weight: bold;
}

.text-waring {
    color: orange;
    font-weight: bold;
}

.text-left {
    text-align: left;
}

.total {
    width: 49%;
    /* padding: 0.4rem; */
    height: 30px;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    background-color: #e9ecef;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    pointer-events: none;
}

.form-btn {
    width: 100%;
    /* padding: 0.4rem; */
    margin-left: 11%;
    height: 120%;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    color: #495057;
    background-color: #818f9d;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-preset {
   padding:10px 15px;
    height: 35px;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    /* color: #495057; */
    background-color: #818f9d;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-reset {
    width: 10%;
    /* padding: 0.4rem; */
    height: 35px;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    color: #ffffff;
    background-color: #384e63;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-50 {
    border-radius: 50%;
    height: 50px;
    min-width: 50px;
    padding: 0 !important;
}

.text-whites {
    color: white;
}

.width-4 {
    width: 4%;
}

.width-15 {
    width: 15% !important;
}

.width-30 {
    width: 30% !important;
}

ul li.bg-color .v-expansion-panel__header {
    background-color: #384e63 !important;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    font-weight: bold;
}

.bg-colors .v-tabs__container--fixed-tabs {
    background-color: #384e63 !important;
    padding: 0px 0px 4px 0px;
}

table {
    border-collapse: collapse;
    width: 100%;
    border-right: #ddd;
    text-transform: uppercase;
}

td a {
    color: #003e70 !important;
}

th {
    background-color: #cccccc;
}

th,
td {
    text-align: center;
    padding: 3px;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.form-input {
    width: 100%;
    /* padding: 0.4rem; */
    height: 30px;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    color: #495057;
    background-color: #e9ecef;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-inputadd {
    width: 100%;
    /* padding: 0.4rem; */
    height: 30px;
    font-size: 1.01rem;
    text-align: center;
    line-height: 1;
    color: #495057;
    background-color: #e9ecef;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    pointer-events: none;
}

.header {
    color: white;
    background-color: #2d3945;
}

.v-tabs__wrapper .v-tabs__container .text-whites a {
    color: #ffffff !important;
}

.betadd {
    background-color: darkorange;
}

.header-bet {
    padding: 8px 0px 0px 0px !important;
    display: inline-flex;
    width: 25%;
    justify-content: center;
    background-color: #818f9d;
    color: #ffffff;
}

.top-bet {
    padding: 0px 4px !important;
    display: inline-flex;
    width: 100%;
}

.top-betadd {
    padding: 0px 0px 0px 0px !important;
    background-color: #ffd9d5;
    display: inline-flex;
    width: 100%;
}

.text-bet {
    min-width: 15%;
    /* border-right: 1px solid #ddd; */
    margin-top: 10px;
    font-size: 12.45px;
    display: inline-block;
}

.text-stock {
    color: #ff9b39;
    /* border-right: 1px solid #ddd; */
    min-width: 13%;
    margin-top: 11px;
    font-size: 11px;
    display: inline-block;
}

.bet-line {
    background-color: black;
}

.bet-box {
    min-width: 68%;
    margin-left: 1%;
    display: inline-block;
    margin-top: 2px;
    margin-bottom: 3px;
}

.tops {
    top: 11%;
}
v-avatar{
    text-align: center;
    margin-top: 10px;
}
</style>
