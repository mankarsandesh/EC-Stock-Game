<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.current bet')}}</div>
                    </template>
                    <v-flex xs6 sm2>
                        <v-select :items="items" label="Sort by:" solo></v-select>
                    </v-flex>
                    <v-card>
                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
                        <table>
                            <tr>
                                <th>{{$t('msg.BetId')}}</th>
                                <th>{{$t('msg.gameid')}}</th>
                                <th>{{$t('msg.Betdetail')}}</th>
                                <th>{{$t('msg.Time')}}</th>
                                <th>{{$t('msg.Amount')}}</th>
                                <th>{{$t('msg.Payout')}}</th>
                                <th>{{$t('msg.Bet Status')}}</th>
                            </tr>
                            <tr>
                                <td>001201910171416002</td>
                                <td>2019101714160</td>
                                <td>第一位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 15:15:52</td>
                                <td>10</td>
                                <td>1.92</td>
                                <td>结算中</td>
                            </tr>
                            <tr>
                                <td>001201910171416003</td>
                                <td>2019101714160</td>
                                <td>第二位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 15:15:52</td>
                                <td>10</td>
                                <td>1.92</td>
                                <td>结算中</td>
                            </tr>
                            <tr>
                                <td>001201910171416001</td>
                                <td>2019101714160</td>
                                <td>合数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 15:15:52</td>
                                <td>110</td>
                                <td>1.92</td>
                                <td>结算中</td>
                            </tr>
                            <tr>
                                <td>001201910171416007</td>
                                <td>2019101714160</td>
                                <td>=两位数-大 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 15:15:52</td>
                                <td>610</td>
                                <td>1.92</td>
                                <td>结算中</td>
                            </tr>
                            <tr>
                                <td>001201910171416010</td>
                                <td>2019101714160</td>
                                <td>第一位数-单 (1.92) 比特币 (1 分鐘)</td>
                                <td>2019-10-17 15:15:52</td>
                                <td>5610</td>
                                <td>1.92</td>
                                <td>结算中</td>
                            </tr>

                            <tr>
                                <td>{{$t('msg.Total This Page')}}</td>
                                <td colspan="3">0</td>
                                <td>$ 0.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{{$t('msg.Total')}}</td>
                                <td colspan="3">0</td>
                                <td>$ 0.00</td>
                                <td></td>
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
    layout: 'classic',
    data() {
        return {
            panel: [true],
            items: ["day", "weeks", "months", "years"],
            load:false
        }
    },
    mounted(){
        setTimeout(()=>{
            this.load =  true
        },2000)
    }
}
</script>

<style scoped>
.position-unset {
    position: unset;
}
</style>
