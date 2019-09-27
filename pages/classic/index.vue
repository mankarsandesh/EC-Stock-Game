<template>
<div>
    {{getStockName($route.params.id)}}
    <v-tabs class="bg-colors" v-model="currentItem" color="transparent" fixed-tabs slider-color="yellow" grow>
        <v-tab class="text-sm-left text-whites" v-for="(item, idx1) in items" :key="idx1" :href="'#tab-' + item.name">{{ item.name }}</v-tab>
    </v-tabs>

    <v-card>
        <input type="checkbox" />Preset
        <button class="btn-preset">Amount</button>
        <input type="text" class="form-input width-15" v-model="price" />
        <button class="btn-reset" type="reset" @click="setPrice('reset')">reset</button>
        <v-btn @click="setPrice('confirm')" color="error" :disabled="this.betData.betdetails.length == '0'">confirm</v-btn>
        <v-btn class="btn-50" v-for="(chip, idx2) in chips" :key="idx2" :disabled="allmoney < chip.name" @click="setPrice($event)" :name="chip.name" :color="chip.color">{{chip.name}}</v-btn>
    </v-card>

    <v-tabs-items v-model="currentItem">
        <v-tab-item v-for="(item, idx3) in items" :key="idx3" :value="'tab-' + item.name">
            <v-card flat>
                <v-expansion-panel v-model="panel" expand>
                    <v-expansion-panel-content class="bg-color" v-for="(items, idx4) in item.children" :key="idx4">
                        <template v-slot:header>
                            <div>{{items.name}}</div>
                        </template>
                        <v-card>
                            <table>
                                <tr>
                                    <th class="header-bet" v-if="items.name == 'Specific-Number'" :style="items.name == 'Specific-Number' && data=='Both Digit' ? 'width:40%':'width:20%'" v-for="(data, idx6) in headertop" :key="idx6">{{data}}</th>
                                    <th class="header-bet" v-if="items.name !== 'Specific-Number'" :style="items.name == 'Specific-Number' && data=='Both Digit' ? 'width:20%':'width:25%'" v-for="(data, idx7) in headertop" :key="idx7">{{data}}</th>
                                </tr>

                                <tr v-for="(datas, idx5) in items.childrens" :key="idx5">
                                    <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                        <div class="text-bet">{{datas.name}}</div>
                                        <div class="text-stock">{{items.payout}}</div>
                                        <div class="bet-box">
                                            <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[0]+'-'+datas.name" />
                                        </div>
                                    </td>

                                    <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                        <div class="text-bet">{{datas.name2}}</div>
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
                                            <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datass.name" />
                                        </div>
                                    </td>

                                    <td class="top-bet" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" v-if="!datas.childrenss" @click="betRow($event)">
                                        <div class="text-bet">{{datas.name3}}</div>
                                        <div class="text-stock">{{items.payout}}</div>
                                        <div class="bet-box">
                                            <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[2]+'-'+datas.name3" />
                                        </div>
                                    </td>

                                    <td class="top-bet" v-if="items.name !== 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'" @click="betRow($event)">
                                        <div class="text-bet">{{datas.name4}}</div>
                                        <div class="text-stock">{{items.payout}}</div>
                                        <div class="bet-box">
                                            <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="header[3]+'-'+datas.name4" />
                                        </div>
                                    </td>
                                    <td class="top-bet" v-if="items.name == 'Specific-Number'" :style="items.name == 'Specific-Number' ? 'width:20%':'width:25%'">
                                        <div class="text-bet">{{datas.name4}}</div>
                                        <div class="text-stock">{{items.payoutt}}</div>
                                        <div class="bet-box">
                                            <button class="form-btn" @click="getsnTwo(datas.name4)" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-tab-item>
    </v-tabs-items>

    <!-- tag ldialog -->
    <v-dialog v-model="dialog" persistent max-width="1240px">
        <v-card>
            <v-card-text>
                <v-card>
                    <button class="btn-preset">Amount</button>
                    <input type="text" class="form-input width-15" v-model="price" />
                    <button class="btn-reset" type="reset" @click="setPrice('reset')">reset</button>
                    <v-btn class="btn-50" v-for="(chip, idx2) in chips" :key="idx2" :disabled="allmoney < chip.name" @click="setPricetop($event)" :name="chip.name" :color="chip.color">{{chip.name}}</v-btn>
                </v-card>
                <table>
                    <tr>
                        <th>Game Rule</th>
                        <th>Payout</th>
                        <th>Amount</th>
                        <th> <button @click="setPrice('reset')">DeleteAll</button> </th>
                    </tr>
                    <tr v-for="(data ,idx11) in this.betData.betdetails" :key="idx11">
                        <td>{{data.ruledt}}</td>
                        <td>{{data.payout}}</td>
                        <td>
                            <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :name="data.ruledt" :value="data.amount" />
                        </td>
                        <td><button @click="deleteTodo(idx11)">Delete</button></td>
                    </tr>
                    <tr>
                        <td colspan="2">{{this.betData.betdetails.length}}</td>
                        <td colspan="2">{{sumTotalAll()}}</td>
                    </tr>
                </table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false , setPrice('reset')">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false" :disabled="this.betData.betdetails.length == '0'">Send</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- tag loop two digit -->
    <v-dialog v-model="dialogtwo" persistent max-width="440px">
        <v-card>
            <v-card-text>
                <table>
                    <tr>
                        <th>TWO DIGIT</th>
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
                                <input type="text" class="form-input" readonly="readonly" @click="bet($event)" :data-stock="stockname" :name="10 > sntwoloopstart ? '0'+data : header[3]+'-'+data" />
                            </div>
                        </td>
                    </tr>
                </table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialogtwo = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialogtwo = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import table from "./json/table.json";
import chips from "./json/chips.json";
import {
    mapGetters
} from "vuex";
export default {
    layout: "classic",
    computed: {
        ...mapGetters(["getStockName"])
    },
    async validate({
        params,
        store
    }) {
        return store.getters.getStockName(params.id)

    },

    data() {
        return {
            chips: chips,
            panel: [true, true, true, true],
            currentItem: "tab-All games",
            more: ["News", "Maps", "Books", "Flights", "Apps"],
            headertop: ["First digit", "Last Digit", "Both Digit", "Two Digit"],
            header: ["firstdigit", "lastdigit", "bothdigit", "twodigit"],
            items: table,
            price: 0,
            betData: {
                betdetails: [],
                betName: []
            },
            dialog: false,
            dialogtwo: false,
            allmoney: 10000,
            sntwoloopstart: null,
            sntwoloopend: null,
            stockname: this.$route.params.id.split('-')[1]
        };
    },
    mounted() {
        // console.log(this.$route.params.id.split('-')[1])

    },
    methods: {

        getsnTwo(val) {
            this.dialogtwo = true
            this.sntwoloopstart = parseInt(val.split("-")[0])
            this.sntwoloopend = parseInt(val.split("-")[1])
        },
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
        deleteTodo(index) {
            this.betData.betdetails.splice(index, 1);
        },
        setPricetop(e) {
            this.price += parseInt(e.target.textContent);
        },
        setPrice(e) {
            if (e == "reset") {
                this.betData.betdetails = [];
                this.betData.betName = [];
                this.price = 0;
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
                e.target.parentElement.children[2].children[0].className = "form-inputadd";

                this.betData.betName.push({
                    ruledt: e.target.parentElement.children[2].children[0].name,
                    stock: e.target.parentElement.children[2].children[0].dataset.stock,
                    payout: e.target.parentElement.children[1].innerText,
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
            }
            // console.log(this.betData.betName);
        },

        bet(e, specialName = "none") {
            // console.log(e)
            this.sumTotalAll()
            if (this.price == 0) {
                // console.log("Null-0");
                return;
            }

            if (e.target.value !== "") {
                e.target.value = parseInt(e.target.value) + parseInt(this.price);
            } else {
                e.target.value = this.price;
            }

            if (specialName !== "none") {
                this.ruledt = specialName.ruledt;
                this.stock = specialName.stock;
                this.payout = specialName.payout;
                this.amount = this.price;
            } else {
                this.ruledt = e.target.name;
                this.stock = e.target.dataset.stock;
                this.payout = e.target.parentElement.parentElement.children[1].innerText;
                this.amount = parseInt(e.target.value);
            }

            this.index = this.betData.betdetails.findIndex(x => x.ruledt === this.ruledt);
            if (this.index == -1) {
                this.betData.betdetails.push({
                    ruledt: this.ruledt,
                    stock: this.stock,
                    payout: this.payout,
                    amount: this.amount
                });
            } else {
                this.betData.betdetails[this.index].amount = this.amount;
            }

            console.log(this.betData.betdetails);
        },
        addItem(item) {
            let removed = this.items.splice(0, 1);
            this.items.push(...this.more.splice(this.more.indexOf(item), 1));
            this.more.push(...removed);
            this.$nextTick(() => {
                this.currentItem = "tab-" + item;
            });
        }
    }
};
</script>

<style>
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
    width: 5%;
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
    width: 5%;
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
