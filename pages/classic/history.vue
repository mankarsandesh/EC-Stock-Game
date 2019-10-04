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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
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
    layout: 'classic',
    data() {
        return {
            panel: [true]
        }
    }
}
</script>
