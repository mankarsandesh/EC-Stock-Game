<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div>{{$t('menu.history')}}</div>
                    </template>
                    <v-card flat>
                        <historyinfo/>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
import historyinfo from "../../components/classic/historyinfo"
export default {
    layout: "classic",
    components:{
        historyinfo
    },
    data() {
        return {
            panel: [true],

        };
    },
   
}
</script>
