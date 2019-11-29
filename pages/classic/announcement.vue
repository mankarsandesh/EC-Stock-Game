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
                                <th style=" width: 55%;">PREVIEW</th>
                                <th>DATE</th>
                            </tr>
                            <tr v-for="(data,index) in announcement" :key="index" @click="getAnnouncement(data.messgageId)" class="annselect">
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
                                                <h4 class="headline mb-3">Dear user</h4>
                                                <span> {{announcement.messageContent}}</span>
                                                <div class="mb-3">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae imperdiet risus. In rutrum dolor et nisi ultricies, sed condimentum mi luctus. Aenean
                                                    lorem ligula, faucibus quis justo et, accumsan luctus nisi. Aenean egestas, neque sit amet dictum tincidunt, risus eros laoreet est, consequat rutrum
                                                    urna dolor a libero. Vivamus erat odio, onibus nec ipsum aliquam, vulputate molestie nibh. Nam scelerisque euismod lobortis. Sed velit sapien, condimentum
                                                    et condimentum ac, blandit in justo. Nullam bibendum sodales diam eget dignissim.
                                                </div>
                                                Regards,<br>
                                                EC Gaming Team
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn @click="isOptions = true, getAnnouncement(null)" color="#818f9c"> <v-icon dark left>arrow_back</v-icon>BACK</v-btn>
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

.annselect{ cursor: pointer;}
table {
    border-collapse: collapse;
    width: 100%;
    border-right: #ddd;
    text-transform: uppercase;
}

td a {
    color: #003e70 !important;
}

th {
    background-color: #cccccc;
}

th,
td {
    text-align: center;
    padding: 6px;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

</style>
