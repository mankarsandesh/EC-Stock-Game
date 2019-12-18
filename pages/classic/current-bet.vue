<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div>{{$t('menu.current bet')}}</div>
                    </template>
                    <v-card>
                      <currentbetinfo/>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
import currentbetinfo from "../../components/classic/currentbetinfo"
export default {
    layout: "classic",
     components:{
        currentbetinfo
    },
    data() {
        return {
            panel: [true],
        };
    }
}
</script>
