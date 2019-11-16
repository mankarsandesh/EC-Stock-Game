<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.announcement')}}</div>
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <onlinechart/>
                        <Analysischart/>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>


import Analysischart from "~/components/classic/Analysischart"
import onlinechart from "~/components/classic/onlinechart"
export default {
    layout: 'classic',
    components:{
        onlinechart,
        Analysischart
    },
    data() {
        return {
            panel: [true],
            load: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.load = true
        }, 1000)
    }
}
</script>
