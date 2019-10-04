<template>
<div>
    <v-tabs-items>
        <v-tab-item>
            <v-card flat>
                <v-expansion-panel v-model="panel" expand>
                    <v-expansion-panel-content class="bg-color">
                        <template v-slot:header>
                            <div> {{$t('menu.announcement')}}</div>
                        </template>
                        <v-card>
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
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-tab-item>
    </v-tabs-items>

</div>
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
