<template>
<div class="navbar">
    <ul class="main-navigation">
        <li> <a href="#">
                <span>
                    select stock
                    <span class="show-icon">
                        <i class="fa fa-caret-down"></i>
                    </span>
                </span>
            </a>
            <ul>
                <li v-for="(stock,index) in navList" :key="index">
                    <a href="#">
                        <span>
                            {{$t('navlist.'+stock.name)}}
                            <span class="show-icon">
                                <i class="fa fa-caret-right"></i>
                            </span>
                        </span>
                    </a>
                    <ul class="ul-left">
                        <li v-for="(stockType,index) in stock.children" :key="index">
                            <a href="#">
                                <span>{{$t('stockname.'+stockType.name)}}</span>
                                <span class="show-icon">
                                    <i class="fa fa-caret-right"></i>
                                </span>
                            </a>
                            <ul class="ul-left">
                                <li v-for="(stockName,index) in stockType.childrens" :key="index">
                                    <a @click="stockNames(stockName.url)">
                                        <span>{{stockName.name}} {{$t('msg.minute')}}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <a @click="stockNames('allstock')">
                        <span>all stock</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
// navlist
// stockname
// listCS

// navList
// children
// childrens

import navList from "~/data/json/menugameresult.json";
export default {
    data() {
        return {
            navList: navList
        }
    },
    methods: {
        stockNames(value) {
            $(".stockName").text(value)
            $("#stockName")[0].click()
        }
    }
}
</script>

<style scoped>
.active {
    border-bottom-style: inset;
    border-bottom-color: #ffd332;
}

.navbar {
    padding: 0 !important;
    flex: 0 1 4% !important;
    text-transform: uppercase;
    max-width: 100%;
}

.show-icon {
    position: absolute;
    right: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #0e4470;
}

ul li {
    display: block;
    width: 100%;
    position: relative;
    float: left;
    background: #0e4470;
}

li ul {
    display: none;
    min-width: 65%;
}

ul li a {
    display: block;
    width: 100%;
    padding: 10px 30px;
    text-decoration: none;
    white-space: nowrap;
    color: #fff;
}

ul li a:hover {
    background: #0e4470;
}

li:hover>ul {
    display: block;
    position: absolute;
}

li:hover li {
    float: none;
}

li:hover a {
    background: #0e4470;
}

li:hover li a:hover {
    background: #e9e8e8;
    color: #000000;
}

.main-navigation {
    display: flex;
    /* width: 25%; */
    /* text-align: center; */
}

.main-navigation li ul li {
    border-top: 0;
    z-index: 1000;
}

ul ul ul {
    left: 0%;
    top: 100%;
}

.ul-left {
    left: 100%;
    top: 0;
}

ul:before,
ul:after {
    content: " ";
    /* 1 */
    display: table;
    /* 2 */
}

ul:after {
    clear: both;
}
</style>
