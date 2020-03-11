<template>
<div id="table-scroll" class="table-scroll table-wrapper-scroll-y pl-3">
    <div>
        <table class="main-table text-center">

            <tbody>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET ID</th>
                    <td>5716868786168778918788</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">GAME ID</th>
                    <td>528176897187</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET DETAIL</th>
                    <td>Both digit-odd(1.95)BTC/USDT 1 minute</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">TIME</th>
                    <td>2020-02-13 08:31:36</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">AMOUNT</th>
                    <td>200</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">PAYOUT</th>
                    <td>1.95</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET STATUS</th>
                    <td>
                        <v-chip color="yellow " text-color="black">PENDING</v-chip>
                    </td>
                </tr>

                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET ID</th>
                    <td>5716868786168778918788</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">GAME ID</th>
                    <td>528176897187</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET DETAIL</th>
                    <td>Both digit-odd(1.95)BTC/USDT 1 minute</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">TIME</th>
                    <td>2020-02-13 08:31:36</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">AMOUNT</th>
                    <td>200</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">PAYOUT</th>
                    <td>1.95</td>
                </tr>
                <tr class="table-rowheight">
                    <th class="fixed-side table-headbg">BET STATUS</th>
                    <td>
                        <v-chip color="yellow " text-color="black">PENDING</v-chip>
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
    jQuery(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');
});
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
</style>
