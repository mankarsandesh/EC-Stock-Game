<template>
<div xs12>
    <breadcrumbs title="Rule" linkItem2="announcement" titlebtn2="announcement" />
    <h1 class="jumbotron-heading text-center">
        EC Gaming Rules Description</h1>
    <p class="lead text-muted text-center">
        {{$t('msg.textinfoule')}}</p>
    <div class="text-xs-center">
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2 buttonGreen" dark v-on="on">
                    result introduction
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline lighten-2" style="color:#0b2a68;" primary-title>
                    <b>Introduction</b>
                </v-card-title>
                <v-card-text>
                    {{$t('msg.textresultintroduction')}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="accept" color="buttonGreen" dark v-on="on" @click="dialog = false">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <!-- <v-expansion-panel v-model="panels" expand>
        <v-expansion-panel-content class="bg-color" v-for="(items, idx) in rules" :key="idx">
            <template v-slot:header>
                <div>{{$t('gamemsg.'+items.name)}} {{items.type}}</div>
            </template>
            <v-card>
                <table>
                    <tr v-for="(data,idx1) in items.values" :key="idx1">
                        <td class="pl-4"><span :class="data.color+' font-weight-bold'">{{$t('gamemsg.'+data.name)}} </span>{{data.value}}</td>
                    </tr>
                </table>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel> -->
    <v-card>
        <onlyrules />
    </v-card>
</div>
</template>

<script>
import onlyrules from "~/components/modern/stocklist/onlyrule";
import breadcrumbs from "~/components/mobile/mobilebreadcrumbs";
export default {
    components: {
        onlyrules,
        breadcrumbs
    },
    data() {
        return {
            dialog: false,
            panel: [0]
        };
    }
};
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

.accept {
    min-width: 80px;
    min-height: 25px;
}
</style>
