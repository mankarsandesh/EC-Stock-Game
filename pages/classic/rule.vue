<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.rule')}}</div>
                    </template>
                    <v-card>
                        <h1 class="jumbotron-heading text-center">
                            EC Gaming Rules Description</h1>
                        <p class="lead text-muted text-center">
                            {{$t('msg.textinfoule')}}</p>
                        <div class="text-xs-center">
                            <v-dialog v-model="dialog" max-width="50%">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="red lighten-2" dark v-on="on">
                                        result introduction
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-title class="headline grey lighten-2" primary-title>
                                        result introduction
                                    </v-card-title>
                                    <v-card-text>
                                        {{$t('msg.textresultintroduction')}}
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" flat @click="dialog = false">
                                            I accept
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>

                        <v-expansion-panel v-model="panels" expand>
                            <v-expansion-panel-content class="bg-color" v-for="(items, idx) in rules" :key="idx">
                                <template v-slot:header>
                                    <div>{{$t('gamemsg.'+items.name)}} {{items.type}}</div>
                                </template>
                                <v-card>
                                    <table>
                                        <tr v-for="(data,idx1) in items.values" :key="idx1">
                                            <td class="text-left"><span :class="data.color+' font-weight-bold'">{{$t('gamemsg.'+data.name)}} </span>{{data.value}}</td>
                                        </tr>
                                    </table>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
import rules from '~/data/json/rule.json'
export default {
    layout: 'classic',
    data() {
        return {
            item: 5,
            panel: [true],
            panels: [true, true, true, true],
            rules: rules,
            dialog: false,
        }
    }
}
</script>

<style scoped>
.flex-column {
    flex-direction: column !important;
}

.text-warning {
    color: darkorange
}

.text-bluelight {
    color: blue
}

.text-info {
    color: rgb(19, 116, 116)
}

.text-secondary {
    color: sandybrown
}

.text-danger {
    color: red
}
</style>
