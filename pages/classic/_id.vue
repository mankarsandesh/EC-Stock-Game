<template>
<div>
    <!-- {{getStockName($route.params.id)}} -->
    <!-- {{$route.params.id}} -->
    <!-- <br/> -->
    <!-- {{getStockNewData($route.params.id)}} -->
    <div v-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-currentbet'">
        <currentbet />
    </div>
    <div v-else-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-history'">
        <history />
    </div>
    <div v-else-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-gameresult'">
        <gameresult />
    </div>
    <div v-else-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-announcement'">
        <announcement />
    </div>
    <div v-else-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-rule'">
        <rule />
    </div>
    <div v-else-if="$route.params.id ==this.$route.params.id.split('-')[0] + '-' + this.$route.params.id.split('-')[1] + '-' + this.$route.params.id.split('-')[2] +'-setting'">
        <setting />
    </div>

    <div v-else>
        <v-tabs class="bg-colors" v-model="currentItem" color="transparent" fixed-tabs slider-color="yellow" grow>
            <v-tab class="text-sm-left text-whites" v-for="(item, idx1) in items" :key="idx1" :href="'#tab-' + item.name">{{ $t('gamemsg.'+item.name )}}</v-tab>
        </v-tabs>

        <v-card>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <input type="checkbox" />
                    {{$t('msg.preset')}}
                    <button class="btn-preset">{{$t('msg.amount')}}</button>
                    <input readonly type="text" class="form-input width-30" v-model="price" />
                    <button class="btn-reset" type="reset" @click="setPrice('reset')">{{$t('msg.reset')}}</button>
                    <v-btn @click="setPrice('confirm')" color="error" :disabled="this.betData.betdetails.length == '0'">{{$t('msg.confirm')}}</v-btn>
                </v-flex>
                <v-flex xs12 md6>
                    <v-avatar size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img :src="chip.img" :disabled="balance < chip.name" @click="setPrice($event)" :name="chip.name">
                            <span class="btn-chips" :style="chip.title !== 'black' ? 'color :black': 'color :white'">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-card>

        <v-tabs-items v-model="currentItem">
            <v-tab-item v-for="(item, idx3) in items" :key="idx3" :value="'tab-' + item.name">
                <v-card flat>
                    <v-expansion-panel v-model="panel" expand>
                        <v-expansion-panel-content class="bg-color" v-for="(items, idx4) in item.children" :key="idx4">
                            <template v-slot:header>
                                <div>{{$t('gamemsg.'+items.name)}}</div>
                            </template>
                            <v-card>
                                <table>
                                    <tr>
                                        <th class="header-bet" v-if="items.name == 'Specific-Number'" :style="items.name == 'Specific-Number' && data=='bothdigit' ? 'width:40%':'width:20%'" v-for="(data, idx6) in header" :key="idx6">{{$t('gamemsg.'+data)}}</th>
                                        <th class="header-bet" v-if="items.name !== 'Specific-Number'" :style="items.name == 'Specific-Number' && data=='bothdigit' ? 'width:20%':'width:25%'" v-for="(data, idx7) in header" :key="idx7">{{$t('gamemsg.'+data)}}</th>
                                    </tr>

                                    <tr v-for="(datas, idx5) in items.childrens" :key="idx5">
                                        <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                            <div class="text-bet">{{datas.name >= 0 ? datas.name: $t('gamemsg.'+datas.name)}}</div>
                                            <div class="text-stock">{{items.payout}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[0]+'-'+datas.name" />
                                            </div>
                                        </td>

                                        <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                            <div class="text-bet">{{datas.name2 >= 0 ? datas.name2: $t('gamemsg.'+datas.name2)}}</div>
                                            <div class="text-stock">{{items.payout}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[1]+'-'+datas.name2" />
                                            </div>
                                        </td>

                                        <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)" v-if="datas.childrenss" v-for="(datass, idx8) in datas.childrenss">
                                            <div class="text-bet">{{datass.name}}</div>
                                            <div class="text-stock">{{items.payoutb}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datass.name" />
                                            </div>
                                        </td>

                                        <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)" v-if="datas.childrenss" v-for="(datass, idx9) in datas.childrenss" :key="idx9">
                                            <div class="text-bet">{{datass.name2}}</div>
                                            <div class="text-stock">{{items.payoutb}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datass.name2" />
                                            </div>
                                        </td>

                                        <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" v-if="!datas.childrenss" @click="betRow($event)">
                                            <div class="text-bet">{{$t('gamemsg.'+datas.name3)}}</div>
                                            <div class="text-stock">{{items.payout}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datas.name3" />
                                            </div>
                                        </td>

                                        <td class="top-bet" v-if="items.name !== 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                            <div class="text-bet">{{$t('gamemsg.'+datas.name4)}}</div>
                                            <div class="text-stock">{{items.payout}}</div>
                                            <div class="bet-box">
                                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[3]+'-'+datas.name4" />
                                            </div>
                                        </td>
                                        <td class="top-bet" v-if="items.name == 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'">
                                            <div class="text-bet">{{datas.name4}}</div>
                                            <div class="text-stock"></div>
                                            <div class="bet-box">
                                                <button class="form-btn" @click="getsnTwo(datas.name4)" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </table>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <v-card>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <input type="checkbox" />
                    {{$t('msg.preset')}}
                    <button class="btn-preset">{{$t('msg.amount')}}</button>
                    <input readonly type="text" class="form-input width-30" v-model="price" />
                    <button class="btn-reset" type="reset" @click="setPrice('reset')">{{$t('msg.reset')}}</button>
                    <v-btn @click="setPrice('confirm')" color="error" :disabled="this.betData.betdetails.length == '0'">{{$t('msg.confirm')}}</v-btn>
                </v-flex>
                <v-flex xs12 md6>
                    <v-avatar size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img :src="chip.img" :disabled="balance < chip.name" @click="setPrice($event)" :name="chip.name">
                            <span class="btn-chips" :style="chip.title !== 'black' ? 'color :black': 'color :white'">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-card>

        <v-tabs class="bg-colors" v-model="currentItems" color="transparent" fixed-tabs slider-color="yellow" grow>
            <v-tab class="text-sm-left text-whites" @click="loadchart()" v-for="(baccarat1, idx1) in baccarat" :key="idx1" :href="'#tab-' + baccarat1.name">{{ baccarat1.name }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentItems">
            <v-tab-item v-for="(baccarat1, idx3) in baccarat" :key="idx3" :value="'tab-' + baccarat1.name">
                <v-card flat>
                    <v-tabs class="bg-colors" v-model="currentItemss" color="transparent" fixed-tabs slider-color="yellow" grow>
                        <v-tab class="text-sm-left text-whites" @click="loadchart()" v-for="(baccarat2, idx11) in baccarat1.children" :key="idx11" :href="'#' + baccarat2.name">{{ baccarat2.name }}</v-tab>
                    </v-tabs>

                    <baccarats :chtable="baccarat1.namech" :chlists="baccarat1.namech+'-'+currentItemss" :dataArray="getStockNewData($route.params.id)" :stocks="stockname" />
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <!-- tag ldialog -->
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
                        <v-avatar size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                            <v-img :src="chip.img" :disabled="balance < chip.name" @click="setPrice($event)" :name="chip.name">
                                <span class="btn-chips" :style="chip.title !== 'black' ? 'color :black': 'color :white'">{{chip.price}}</span>
                            </v-img>
                        </v-avatar>
                    </v-card>
                    <table>
                        <tr>
                            <th>{{$t('msg.gamerule')}}</th>
                            <th>{{$t('msg.payout')}}</th>
                            <th>{{$t('msg.amount')}}</th>
                            <th>
                                <span @click="setPrice('reset')">{{$t('msg.deleteall')}}</span>
                            </th>
                        </tr>
                        <tr v-for="(data ,idx11) in betDataShows" :key="idx11">
                            <td>{{data.rule.split("-")[1] >= 0 ? $t('gamemsg.'+data.rule.split("-")[0])+' - '+data.rule.split("-")[1]: $t('gamemsg.'+data.rule.split("-")[0])+' - '+$t('gamemsg.'+data.rule.split("-")[1])}}</td>
                            <td>{{data.payout}}</td>
                            <td>
                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :name="data.rule" :value="data.amount" />
                            </td>
                            <td>
                                <button @click="deleteTodo(idx11)">Delete</button>
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
                    <v-btn color="error" @click="dialog = false , setPrice('reset')">{{$t('msg.cancel')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- tag loop two digit -->
        <v-dialog v-model="dialogtwo" persistent max-width="440px">
            <v-card>
                <v-card-text>
                    <v-avatar size="60" justify-content-center v-for="(chip,key1) in chips" :key="key1">
                        <v-img :src="chip.img" :disabled="balance < chip.name" @click="setPrice($event)" :name="chip.name">
                            <span class="btn-chips" :style="chip.title !== 'black' ? 'color :black': 'color :white'">{{chip.price}}</span>
                        </v-img>
                    </v-avatar>
                    <table>
                        <tr>
                            <th>TWO DIGIT</th>
                        </tr>
                        <tr v-if="sntwoloopstart == 0">
                            <td class="top-bet" @click="betRow($event)">
                                <div class="text-bet">00</div>
                                <div class="text-stock">{{twodigit_payout}}</div>
                                <div class="bet-box">
                                    <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[3]+'-00'" />
                                </div>
                            </td>
                        </tr>
                        <tr v-for=" (data, idx12) in sntwoloopend" v-if="data >= sntwoloopstart" :key="idx12">
                            <td class="top-bet" @click="betRow($event)">
                                <div class="text-bet">{{ 10 > sntwoloopstart ? '0'+data : data}}</div>
                                <div class="text-stock">{{twodigit_payout}}</div>
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
import table from "./json/table.json";
import chips from "./json/chips.json";
import baccarat from "./json/baccarat.json";
import openSocket from "socket.io-client";
import AnimatedNumber from "animated-number-vue";
import {
    mapGetters
} from "vuex";
export default {
    layout: "classic",
    components: {
        AnimatedNumber,
        baccarats,
        currentbet,
        history,
        gameresult,
        announcement,
        rule,
        setting
    },

    async validate({
        params,
        store
    }) {
        return store.getters.getStockName(params.id);
    },

    data() {
        return {
            currentItems: "tab-Big Small",
            currentItemss: null,
            baccarat: baccarat,
            chipsReset: chips,
            chips: [],
            panel: [false, false, false, false],
            currentItem: "tab-All games",
            header: ["firstdigit", "lastdigit", "bothdigit", "twodigit"],
            items: table,
            price: null,
            betData: {
                betdetails: [],
                betName: []
            },
            betDataShows: [],
            dialog: false,
            dialogtwo: false,
            balance: this.$store.state.balance,
            sntwoloopstart: null,
            sntwoloopend: null,
            stockname: this.$route.params.id.split("-")[1],
            twodigit_payout: 98.82,
            show1: true
        };
    },

    mounted() {
        // console.log(this.getStockName(this.$route.params.id).loop)
        this.getTime();
        this.getchips();
        // console.log(this.baccarat)
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
                total: this.sumTotalAll,
                data: this.betData.betdetails,
                webid: "001"
            };
        }
    },
    methods: {
        getchips() {
            if (localStorage.chips == null) {
                localStorage.chips = JSON.stringify(this.chipsReset)
                this.chips = JSON.parse(localStorage.chips)
            } else {
                this.chips = JSON.parse(localStorage.chips)
            }
        },
        loadchart() {
            this.show1 = false;
            setTimeout(() => {
                this.show1 = true;
            }, 0);
        },
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },

        getConfirmBet() {
            console.log(this.formData);
            this.$store.state.balance = this.balance =
                this.balance - this.sumTotalAll;
            setTimeout(() => {
                this.setPrice("reset");
            }, 3000);
        },

        getsnTwo(val) {
            this.dialogtwo = true;
            this.sntwoloopstart = parseInt(val.split("-")[0]);
            this.sntwoloopend = parseInt(val.split("-")[1]);
        },

        deleteTodo(index) {
            this.betData.betdetails.splice(index, 1);
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
                $("input:text").val("");
                $(".form-inputadd").attr("class", "form-input");
                $(".top-betadd").attr("class", "top-bet");
            } else if (e == "confirm") {
                this.dialog = true;
            } else {
                this.price += parseInt(e.target.textContent);
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
                    rule: e.target.parentElement.children[2].children[0].name,
                    stock: e.target.parentElement.children[2].children[0].dataset.stock,
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
            // console.log(e)
            if (this.price == 0 || this.price == null) {
                // console.log("Null-0");
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
                this.rule = specialName.rule;
                this.stock = specialName.stock;
                this.amount = this.price;
            } else {
                this.rule = e.target.name;
                this.stock = e.target.dataset.stock;
                this.payout =
                    e.target.parentElement.parentElement.children[1].innerText;
                this.amount = parseInt(e.target.value);
            }

            this.index = this.betData.betdetails.findIndex(x => x.rule === this.rule);
            if (this.index == -1) {
                this.betData.betdetails.push({
                    rule: this.rule,
                    stock: this.stock,
                    amount: this.amount,
                    loop: this.loop
                });
            } else {
                this.betData.betdetails[this.index].amount = this.amount;
            }
            // End data send to server

            // Data Show
            if (specialName !== "none") {
                this.rule = specialName.rule;
                this.stock = specialName.stock;
                this.payout = specialName.payout;
                this.amount = this.price;
            } else {
                this.rule = e.target.name;
                this.stock = e.target.dataset.stock;
                this.payout =
                    e.target.parentElement.parentElement.children[1].innerText;
                this.amount = parseInt(e.target.value);
            }

            this.index = this.betDataShows.findIndex(x => x.rule === this.rule);
            if (this.index == -1) {
                this.betDataShows.push({
                    rule: this.rule,
                    stock: this.stock,
                    payout: this.payout,
                    amount: this.amount,
                    loop: this.loop
                });
            } else {
                this.betDataShows[this.index].amount = this.amount;
            }
            // End  data Show
            console.log(this.betDataShows);
        },

        getTime() {
            const socket = openSocket("https://websocket-timer.herokuapp.com");
            socket.on("time", data => {
                let times, calculating;
                if (this.$route.params.id.split("-")[1] == "btc1") {
                    times = data.btc1.timer;
                    calculating = 41;
                } else if (this.$route.params.id.split("-")[1] == "btc5") {
                    times = data.btc5.timer;
                    calculating = 241;
                } else if (this.$route.params.id.split("-")[1] == "usindex") {
                    times = data.usindex.timer;
                    calculating = 241;
                } else {
                    times = data.SH000001.timer;
                    calculating = 241;
                }
                if (times > calculating) {
                    this.getBetClosed();
                } else if (times == "close") {
                    this.getBetClosed();
                } else {
                    this.getBetOpen();
                }
            });
        },

        getBetClosed() {
            this.panel = [false, false, false, false];
            this.setPrice("reset");
        },

        getBetOpen() {
            this.panel = [true, true, true, true];
        }
    }
};
</script>

<style>
.btn-chips {
    top: 31%;
    position: relative;
    margin-left: -4%;
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
    height: 30px;
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
    width: 10%;
    /* padding: 0.4rem; */
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
    padding: 8px;
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
    padding: 0px 0px 0px 0px !important;
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
    width: 15%;
    /* border-right: 1px solid #ddd; */
    margin-top: 10px;
    font-size: 12.45px;
    display: inline-block;
}

.text-stock {
    color: #ff9b39;
    /* border-right: 1px solid #ddd; */
    width: 13%;
    margin-top: 11px;
    font-size: 11px;
    display: inline-block;
}

.bet-line {
    background-color: black;
}

.bet-box {
    width: 68%;
    margin-left: 1%;
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 5px;
}
</style>
