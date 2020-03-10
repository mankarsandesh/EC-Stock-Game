<template>
<div>
    <v-card class="my-bg">

        <v-layout row wrap justify-center class="allchips">
            <v-flex class="settingchips" xs4 sm3 md3 lg2 v-for="(item,key) in imgChip" :key="key" justify-center>
                <div class="d-block">
                    <v-img :width="item.width" :src="item.img" class="chipImage">
                        <v-text-field class="setpricechip" outlined v-model="getCoins_modern[key]" :class="item.color" :ref="item.id"></v-text-field>
                    </v-img>
                    <v-card-actions class="justify-center">
                        <v-btn class="chipamount" text @click="conOrEClick()">{{$t('msg.'+conOrE)}}</v-btn>
                    </v-card-actions>
                    <div v-show="conOrE=='confirm'">
                        <v-card-text>{{$t('msg.min')}} = $200</v-card-text>
                        <v-card-text>{{$t('msg.max')}} = $20,000</v-card-text>
                    </div>
                </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-center style="background-color: #f2f4ff;">
            <v-btn text @click="reset" style="background-color: #fec623!important;border-radius:8px;">{{$t('msg.resettodefault')}}</v-btn>
        </v-layout>

        <v-layout row wrap justify-center style="background-color: #f2f4ff;">
            <v-btn class="my-btn buttonGreen" @click="saveClick()">{{$t('msg.save')}}</v-btn>
            <v-btn class="my-btn cancel buttonCancel" @click="conOrEClick()">{{$t('msg.cancel')}}</v-btn>
        </v-layout>

    </v-card>
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from "vuex";

export default {

    data() {
        return {
            conOrE: 'edit',
            imgChip: [{
                    id: "ship1",
                    title: "Danger",
                    img: "/chip/danger.png",
                    width: "100"
                },
                {
                    id: "ship2",
                    title: "Primary",
                    img: "/chip/primary.png",
                    width: "100"
                },
                {
                    id: "ship3",
                    title: "success",
                    img: "/chip/success.png",
                    width: "105"
                },
                {
                    id: "ship4",
                    title: "warning",
                    img: "/chip/warning.png",
                    width: "110"
                },
                {
                    id: "ship5",
                    title: "black",
                    img: "/chip/black.png",
                    color: "text-dark",
                    width: "120"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getCoins_modern"])
    },
    methods: {
        ...mapMutations(["setCoins_modern"]),
        conOrEClick() {
            if (this.conOrE == 'edit') {
                this.conOrE = 'confirm';
            }
            else {
                this.conOrE = 'edit';
            }
        },
        reset() {
            let defaultCoin = ["100", "500", "1000", "5000", "10000"];
            this.$refs.ship1[0].value = defaultCoin[0]
            this.$refs.ship2[0].value = defaultCoin[1]
            this.$refs.ship3[0].value = defaultCoin[2]
            this.$refs.ship4[0].value = defaultCoin[3]
            this.$refs.ship5[0].value = defaultCoin[4]
            if (this.conOrE == 'confirm') {
                this.conOrE = 'edit';
            }
        },
        saveClick() {
            let ship1 = this.$refs.ship1[0].value
            let ship2 = this.$refs.ship2[0].value
            let ship3 = this.$refs.ship3[0].value
            let ship4 = this.$refs.ship4[0].value
            let ship5 = this.$refs.ship5[0].value
            let new_amount = `["${ship1}", "${ship2}", "${ship3}", "${ship4}", "${ship5}"]`;
            localStorage.setItem("coinModern", new_amount);
            this.setCoins_modern();
            if (this.conOrE == 'confirm') {
                this.conOrE = 'edit';
            }
        }
    }
};
</script>

<style scoped>
.setpricechip {
    position: relative;
    left: 6px;
    top: 34%;
    padding-bottom: 2px;
    text-align: center;
    color: black;
    font-size: 1.2rem;
}

input {
    background-color: brown
}

.settingchips {
    margin: 5px 10px;
    text-align: center;
    clear: both;
}

.allchips {
    margin-top: 30px;
    background-color: #f2f4ff;
}

.chipImage {
    margin: 0 auto;
}

.chipamount {
    margin: 0 auto;
    text-align: center;
    border-radius: 8px;
}

.v-btn {
    font-size: 14px;
    font-weight: 400;
    background-color: #6424B9 !important;
    color: #ffffff !important;
    padding: 4px 10px;
    margin: 4px;
}
</style>
