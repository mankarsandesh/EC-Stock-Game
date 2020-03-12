<template>
<div>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <currentbet :head="head" :desserts="desserts"></currentbet>
</div>
</template>

<script>
import currentbet from "~/components/mobile/currentbet";
import {
    mapState
} from "vuex";
export default {
    layout: "",
    components: {
        currentbet
    },
    data() {
        return {
            desserts: []
        };
    },
    computed: {
        ...mapState(["portalProviderUUID","userUUID"]) //get 2 data from vuex first, in the computed
    },
    mounted() {
        this.fetch(); // after this component render done, this will call the function from method
    },
    methods: {
        async fetch() {
            // afer moumted call the functions this method will run the fetch the data from API
            const data1 = {
                // before we call the data we should make the object to the send the request with the API
                portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
                userUUID: this.userUUID, // get the userUUID with the this object
                version: "0.1", // version of API
                betResult: [-1,0,1], // -1= pending, pending that mean is betting
                limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
                offset: "0" // offset or skip the data
            };
            const {
                data
            } = await this.$axios.post(
                "http://uattesting.equitycapitalgaming.com/webApi/getAllBets", // after finish crawl the every API will the the baseURL from AXIOS
                data1, // data object
                {
                    headers: {
                        Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
                    }
                }
            );
            console.log(data);
            this.desserts = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion
        }
    }
};
</script>
