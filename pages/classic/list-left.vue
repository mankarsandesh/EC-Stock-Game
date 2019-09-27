<template>
<v-card tile flat color="red lighten-2">
    <v-expansion-panel v-model="panel1" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items1" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div>User info</div>
            </template>
            <v-card>
                Balance :
                <animated-number :value="balance" :formatValue="formatToPrice" />

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-model="panel2" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items2" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div>Bet result</div>
            </template>
            <v-card>
                <table>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-model="panel3" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items3" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div>All results</div>
            </template>
            <v-card>
                <table>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-card>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
    layout: "classic",
    components: {
        AnimatedNumber
    },
    data() {
        return {
            items1: 1,
            items2: 1,
            items3: 1,
            panel1: [1],
            panel2: [1],
            panel3: [1],
            balance: this.$store.state.balance,
        }
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
    },

}
</script>

<style scoped>
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
    padding: 8px;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
