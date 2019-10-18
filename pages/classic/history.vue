<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div>{{$t('menu.history')}}</div>
                    </template>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs6 md2 pa>
                                <v-menu v-model="from" :close-on-content-click="false" :nudge-right="0" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="datefrom" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-menu v-model="to" :close-on-content-click="false" :nudge-right="0" transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dateto" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-btn class="my-btn go">go</v-btn>
                            <v-flex xs6 md2 class="float-right">
                                <v-select hide-details :items="items" label="Sort By :" solo></v-select>
                            </v-flex>
                        </v-layout>
                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
                        <table>
                            <tr>
                                <th>{{$t('msg.BetId')}}</th>
                                <th>{{$t('msg.gameid')}}</th>
                                <th>{{$t('msg.Betdetail')}}</th>
                                <th>{{$t('msg.Time')}}</th>
                                <th>{{$t('msg.Amount')}}</th>
                                <th>{{$t('msg.Payout')}}</th>
                            </tr>
                            <tr>
                                <td>001201910171203003</td>
                                <td>2019101712030</td>
                                <td>第二位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 13:02:44</td>
                                <td>10</td>

                                <td><span style="color: green;">19.2</span></td>
                            </tr>
                            <tr>
                                <td>001201910171203002</td>
                                <td>2019101712030</td>
                                <td>第一位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 13:02:55</td>
                                <td>10000</td>
                                <td><span style="color: red;">-10000</span></td>

                            </tr>
                            <tr>
                                <td>001201910141630003</td>
                                <td>2019101416300</td>
                                <td>第二位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-14 17:29:39</td>
                                <td>5000</td>

                                <td><span style="color: green;">9600</span></td>
                            </tr>
                            <tr>
                                <td>001201910141629002</td>
                                <td>2019101416290</td>
                                <td>第一位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-14 17:28:52</td>
                                <td>10</td>

                                <td><span style="color: green;">19.2</span></td>
                            </tr>
                            <tr>
                                <td>001201910141629003</td>
                                <td>2019101416290</td>
                                <td>第二位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-14 17:28:52</td>
                                <td>10</td>
                                <td><span style="color: red;">-10</span></td>

                            </tr>
                            <tr>
                                <td>001201910141629001</td>
                                <td>2019101416290</td>
                                <td>合数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-14 17:28:52</td>
                                <td>10</td>
                                <td><span style="color: red;">-10</span></td>

                            </tr>
                            <tr>
                                <td>001201910071342032</td>
                                <td>01062019100713420</td>
                                <td>=两位数-00 (98.82) 比特币 (1 分鐘)</td>
                                <td>2019-10-07 14:41:39</td>
                                <td>10</td>
                                <td><span style="color: red;">-10</span></td>

                            </tr>
                            <tr>
                                <td>0010106201910071020002</td>
                                <td>01062019100710200</td>
                                <td>第一位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-07 11:20:01</td>
                                <td>100</td>
                                <td><span style="color: red;">-100</span></td>

                            </tr>
                            <tr>
                                <td>0010106201910071021005</td>
                                <td>01062019100710210</td>
                                <td>第一位数-小 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-07 11:20:24</td>
                                <td>100</td>

                                <td><span style="color: green;">192</span></td>
                            </tr>
                            <tr>
                                <td>0010106201910101035002</td>
                                <td>01062019101010350</td>
                                <td>第一位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-10 11:34:52</td>
                                <td>10000</td>
                                <td><span style="color: red;">-10000</span></td>

                            </tr>
                            <tr>
                                <td>0010106201910101035005</td>
                                <td>01062019101010350</td>
                                <td>第一位数-小 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-10 11:34:56</td>
                                <td data-v-3798e4a8="">10000</td>

                                <td data-v-3798e4a8=""><span data-v-3798e4a8="" style="color: green;">19200</span></td>
                            </tr>

                            <tr>
                                <td>{{$t('msg.Total This Page')}}</td>
                                <td colspan="3">0</td>
                                <td>$ 0.00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{{$t('msg.Total')}}</td>
                                <td colspan="3">0</td>
                                <td>$ 0.00</td>
                                <td></td>
                            </tr>
                        </table>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
export default {
    layout: "classic",
    data() {
        return {
            panel: [true],
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years"],
            load: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.load = true
        }, 2000)
    }
};
</script>
