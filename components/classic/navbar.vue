<template>
<v-layout>
    <v-tabs color="cyan" grow dark next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
        <v-tabs-slider color="yellow" grow></v-tabs-slider>
        <v-tab v-for="(item,i) in navList" :key="i" :href="'#' + item.name">
            {{ $t('navlist.'+item.name) }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item v-for="(item,i) in navList" :key="i" :value="item.name">
                <v-card flat>
                    <v-tabs color="cyan" grow dark next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                        <v-tabs-slider color="yellow" grow></v-tabs-slider>
                        <v-tab v-for="(item2,i) in item.children" :key="i" :href="'#' + item2.name" @click="$router.push('/classic/'+item2.url), loadchart()">
                            {{$t('stockname.'+item2.name)}}
                        </v-tab>

                        <v-tabs-items>
                            <v-tab-item v-for="(item2,i) in item.children" :key="i" :value="item2.name">
                                <v-card flat>

                                    <v-tabs color="cyan" grow dark next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                                        <v-tabs-slider color="yellow" grow></v-tabs-slider>
                                        <v-tab v-for="(item3,i) in item2.childrens" :key="i" @click="$router.push('/classic/'+item3.url), loadchart()">
                                            {{$t('listCS.'+item3.name)}}
                                        </v-tab>

                                    </v-tabs>

                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>

                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</v-layout>
</template>

<script>
// navlist
// stockname
// listCS

// navList
// children
// childrens

import navList from "~/data/json/menu.json";
export default {
    data() {
        return {
            navList: navList
        }
    },
    methods:{
        loadchart(){
            $(".loadchart")[0].click()
        }
    }
}
</script>
