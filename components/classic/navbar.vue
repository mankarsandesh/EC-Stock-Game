<template>
<div class="navbar container mx-auto">
    <ul class="main-navigation">
        <li v-for="(stock,index) in navList" :key="index" class="active">
            <a href="#">
                <span>
                    {{stock.name}}
                    <span class="show-icon">
                        <i class="fa fa-caret-down"></i>
                    </span>
                </span>
            </a>
            <ul>
                <li v-for="(stockType,index) in stock.children" :key="index" class="active">
                    <a href="#">
                        <span>{{stockType.name}}</span>
                        <span class="show-icon">
                            <i class="fa fa-caret-right"></i>
                        </span>
                    </a>
                    <ul>
                        <li v-for="stockName in stockType.childrens" :key="stockName">
                            <a href="#">
                                <span>{{stockName.name}}</span>
                                <span class="show-icon">
                                    <i class="fa fa-caret-right"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
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

import navList from "~/data/json/menustockchina.json";
export default {
    data() {
        return {
            navList: navList
        }
    },
    methods: {
        loadchart() {
            $(".loadchart")[0].click()
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
    /* align-content: center;
    width: 88.5%;
    align-self: center; */
}

.show-icon {
    position: absolute;
    right: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #003e70;
}

ul li {
    display: block;
    width: 100%;
    position: relative;
    float: left;
    background: #003e70;
}

li ul {
    display: none;
    min-width: 50%;
}

ul li a {
    display: block;
    width: 100%;
    padding: 0.6em;
    text-decoration: none;
    white-space: nowrap;
    color: #fff;
}

ul li a:hover {
    background: #003e70;
}

li:hover>ul {
    display: block;
    position: absolute;
}

li:hover li {
    float: none;
}

li:hover a {
    background: #003e70;
}

li:hover li a:hover {
    background: #1b405f;
}

.main-navigation {
    display: -webkit-box;
    width: 25%;
}

.main-navigation li ul li {
    border-top: 0;
    z-index: 2000;
}

ul ul ul {
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
