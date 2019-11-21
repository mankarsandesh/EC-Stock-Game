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
                        <table v-show="isOptions">
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>PREVIEW</th>
                                <th>DATE</th>
                            </tr>
                            <tr v-for="(data,index) in announcement" :key="index" @click="getAnnouncement(data.messgageId)">
                                <td>{{index+1}}</td>
                                <td>{{data.title}}</td>
                                <td> {{data.messageContent}}</td>
                                <td>{{data.created_at}}</td>
                            </tr>

                        </table>
                        <div v-show="!isOptions">
                            <v-layout>
                                <v-flex xs12 sm12>
                                    <v-card>
                                        <v-card-actions class="bg-tabpbar">
                                            {{announcement.title}}
                                            <v-spacer></v-spacer>
                                            {{announcement.created_at}}
                                        </v-card-actions>
                                        <v-card-title>
                                            <div>
                                                <span> {{announcement.messageContent}}</span>
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>

                                            <v-btn @click="isOptions = true, getAnnouncement(null)" color="#818f9c"> BACK</v-btn>

                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>
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
    components: {},
    data() {
        return {
            panel: [true],
            load: false,
            announcement: [],
            isOptions: true
        }
    },
    mounted() {
        this.getAnnouncement(null)
    },
    methods: {
        async getAnnouncement(val) {
            let announcement = await this.$axios.$get('/api/announcement?apikey=' + this.$store.state.auth_token)
            if (announcement.data !== null) {
                this.load = true
            }

            if (val != null) {
                this.isOptions = false
                // console.log(val)
                for (let i = 0; i < announcement.data.length; i++) {
                    if (announcement.data[i].messgageId == val) {
                        this.announcement = {
                            messgageId: announcement.data[i].messgageId,
                            title: announcement.data[i].title,
                            messageContent: announcement.data[i].messageContent,
                            adminId: announcement.data[i].adminId,
                            created_at: announcement.data[i].created_at,
                        }
                    }
                }
            } else {
                this.announcement = announcement.data
            }
        }
    },
}
</script>

<style scoped>
.bg-tabpbar {
    background-color: #818f9c;
    color: white;
    font-weight: bold;
}
</style>
