<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.game result')}}</div>
                    </template>
                    <v-card>
                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
                        <table>
                            <tr>
                                <th>{{$t('msg.Stock Name')}}</th>
                                <th>{{$t('msg.Game Mode')}}</th>
                                <th>{{$t('msg.Result')}}</th>
                                <th>{{$t('msg.result out time')}}</th>
                                <th>{{$t('msg.gameid')}}</th>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7977.29</td>
                                <td>2019-10-17 15:17:12</td>
                                <td>01062019101714190</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7977.74</td>
                                <td>2019-10-17 15:16:12</td>
                                <td>01062019101714190</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>5</td>
                                <td>7977.21</td>
                                <td>2019-10-17 15:15:23</td>
                                <td>01062019101714150</td>
                            </tr>
                            <tr>
                                <td>US dollar Index</td>
                                <td>5</td>
                                <td>98.0680</td>
                                <td>2019-10-17 15:15:23</td>
                                <td>00052019101714150</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7977.21</td>
                                <td>2019-10-17 15:15:12</td>
                                <td>01062019101714190</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7973.01</td>
                                <td>2019-10-17 15:14:11</td>
                                <td>01062019101714140</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7973.00</td>
                                <td>2019-10-17 15:13:11</td>
                                <td>01062019101714140</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7968.95</td>
                                <td>2019-10-17 15:12:12</td>
                                <td>01062019101714140</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.27</td>
                                <td>2019-10-17 15:11:12</td>
                                <td>01062019101714140</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>5</td>
                                <td>7967.98</td>
                                <td>2019-10-17 15:10:23</td>
                                <td>01062019101714100</td>
                            </tr>
                            <tr>
                                <td>US dollar Index</td>
                                <td>5</td>
                                <td>98.0882</td>
                                <td>2019-10-17 15:10:23</td>
                                <td>00052019101714100</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.98</td>
                                <td>2019-10-17 15:10:12</td>
                                <td>01062019101714140</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.00</td>
                                <td>2019-10-17 15:09:11</td>
                                <td>01062019101714090</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.16</td>
                                <td>2019-10-17 15:08:11</td>
                                <td>01062019101714090</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7969.51</td>
                                <td>2019-10-17 15:07:12</td>
                                <td>01062019101714090</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7969.52</td>
                                <td>2019-10-17 15:06:21</td>
                                <td>01062019101714090</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>5</td>
                                <td>7967.02</td>
                                <td>2019-10-17 15:05:22</td>
                                <td>01062019101714050</td>
                            </tr>
                            <tr>
                                <td>US dollar Index</td>
                                <td>5</td>
                                <td>98.0974</td>
                                <td>2019-10-17 15:05:22</td>
                                <td>00052019101714050</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.02</td>
                                <td>2019-10-17 15:05:12</td>
                                <td>01062019101714090</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7967.00</td>
                                <td>2019-10-17 15:02:12</td>
                                <td>01062019101714040</td>
                            </tr>
                            <tr>
                                <td> BTC/USDT</td>
                                <td>1</td>
                                <td>7965.00</td>
                                <td>2019-10-17 15:01:12</td>
                                <td>01062019101714040</td>
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
            load: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.load = true
        }, 2000)
    }
}
</script>
