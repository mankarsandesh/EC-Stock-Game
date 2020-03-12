<template>
<div id="table-scroll" class="table-scroll table-wrapper-scroll-y pl-3">
    <div>
        <table class="main-table">
            <tbody v-for="(item ,index) in desserts" :key="index">
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET ID</th>
                    <td>{{item.betID}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">GAME ID</th>
                    <td>{{item.gameID}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET DETAIL</th>
                    <td>{{item.ruleName}} - ({{item.payout}}) {{item.stockName}} / {{item.loop}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">TIME</th>
                    <td>{{item.createdTime}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">AMOUNT</th>
                    <td>{{item.betAmount}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">PAYOUT</th>
                    <td>{{item.payout}}</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET STATUS</th>
                    <td v-if="item.betResult == 'win'">
                        <v-chip class="betstatus text-uppercase" color="green" text-color="white">{{item.betResult}}</v-chip>
                    </td>
                    <td v-if="item.betResult == 'lose'">
                        <v-chip class="betstatus text-uppercase" color="red" text-color="white">{{item.betResult}}</v-chip>
                    </td>
                    <td v-if="item.betResult == 'pending'">
                        <v-chip class="betstatus text-uppercase" color="yellow " text-color="black">{{item.betResult}}...</v-chip>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
// requires jquery library
jQuery(document).ready(function () {
    jQuery(".main-table")
        .clone(true)
        .appendTo("#table-scroll")
        .addClass("clone");
});
</script><script>
export default {
    props: ["desserts"]
};
</script>

<style scoped>
.table-rowheight {
    height: 50px;
}

.table-scroll {
    position: relative;

    max-width: 600px;
    margin: auto;
    overflow: auto;
    height: 365px;
}

.table-wrapper-scroll-y {
    display: block;
}

.th {
    background-color: #f1f1f1;
}

.table-wrap {
    width: 100%;
    overflow: auto;
}

.table-scroll table {
    width: 100%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0;
}

.table-scroll th,
.table-scroll td {
    padding: 5px 10px;
    border: 1px solid #ebeced;
    background: #fff;
    white-space: nowrap;
    vertical-align: top;
}

.table-scroll thead,
.table-scroll tfoot {
    background: #f9f9f9;
}

.clone tbody th {
    visibility: visible;
    color: red;
}

.clone .fixed-side {
    border: 1px solid #000;
    background: #f1f1f1;
    visibility: visible;
}

.table-headbg {
    background: #f1f1f1 !important;
}

.clone thead,
.clone tfoot {
    background: transparent;
}
.betstatus{
    border-radius:10px;
}

::-webkit-scrollbar {
  width: 12px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #ACACAC;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ACACAC;
  border-radius: 15px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2C6B9E;
}
</style>
