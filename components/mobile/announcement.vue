<template>
<v-flex xs12 class="mt-3">
    <div class="v-table__overflow">
        <table class="v-datatable v-table theme--light">
            <thead>
                <tr>
                    <th scope="col" class="bg-colors">{{$t('msg.titles')}}</th>
                    <th scope="col" class="bg-colors">{{$t('msg.date')}}</th>
                    <th scope="col" class="bg-colors">{{$t('msg.preview')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in apiData" :key="index" class="tabletr">
                    <td>{{item.title}}</td>
                    <td>{{item.createdAt}}</td>
                    <td v-if="item.message.length>100">{{item.message.slice(0,100)}}</td>
                    <td v-else>{{item.message}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</v-flex>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            apiData: []
        }
    },
    computed: {
        ...mapState(["portalProviderUUID", "headers"])
    },
    mounted() {
        this.callApi()
    },
    methods: {
        async callApi() {
            const {
                data
            } = await this.$axios.$post(
                "http://uattesting.equitycapitalgaming.com/webApi/getAllAnnouncements", {
                    portalProviderUUID: this.portalProviderUUID,
                    version: "0.1"
                }, {
                    headers: {
                        Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, because the backend they will check
                    }
                }
            );
            this.apiData = data
            console.log(data);
        }
    }
};
</script>

<style scoped>
table {
    border: none;
    /* border:1px solid red; */
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 2px 3px 10px rgb(0, 0, 0, 0.3);
}

.thead-dark {
    border-radius: 10px !important;
    color: #fff;
    background-color: #f5f5f5;
}

.bg-colors {
    font-size: 18px;
    color: #333;
    background-color: #f5f5f5 !important;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}

tbody tr td {
    padding: 20px;
    font-size: 16px;
}
</style>
