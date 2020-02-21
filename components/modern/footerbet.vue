<template>
<div>
    
    <v-layout row justify-center class="footerBet">
      <v-flex xs1 class="amount">
         <div>
             $ {{getAllBettingAmount}}
         </div> 
      </v-flex>
      <v-flex xs3  class="chipsdiv">
             <v-layout row>
                <v-flex class="text-center" >
                    <v-avatar size="70" v-for="(item,key) in imgChip" :key="key" class="chips">
                        <v-img @click="setFooterBetAmount(getCoins_modern[key])"  :src="item.img" :width="item.width" :alt="item.title" :class="item.color" class="chipImg">
                            <span class="setpricechip"> {{getCoins_modern[key]}}</span>
                        </v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
      </v-flex>
      <v-flex xs2  class="betButton">
          <div>               
              <v-btn class="buttonGreen" dark @click="getSending()" >{{$t('msg.'+texts)}}</v-btn>
              <v-btn class="buttonCancel"  @click="clearDataMultiGameBet()" >{{$t('msg.cancel')}}</v-btn>
          </div>            
      </v-flex>
    </v-layout>

    <!-- Generator: Adobe Illustrator 24.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!-- <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1366 70" style="enable-background:new 0 0 1366 70; margin-bottom: -4.6px;" xml:space="preserve">

        <g class="st0">
            <g class="st1">
                <path class="st2" d="M978.8,70.1c38.9,0,77.8,0,116.6,0h3.5l-41.9-38.2c-4.7-4.6-12-6.9-21.6-6.9c-30.8,0.2-61.7,0.3-92.5,0.5" />
            </g>
        </g>
        <g>
            <g>

                <g>
                    <path style="cursor:pointer" class="st3" d="M547.1,56.2c1.2-2.4,2.4-4.7,3.5-7.1c1.6-3.3,3.3-6.6,4.9-9.9c-44.1,0-88.1,0-132.2,0

c-6.3,0-11.1,1.6-14.2,4.8L381.4,71h2.3c51.9,0,103.8,0,155.6,0c0.9-1.9,1.9-3.8,2.8-5.6C543.8,62.3,545.4,59.2,547.1,56.2z" />
                </g>
            </g>
            <g>

                <g>
                    <path @click="clearDataMultiGameBet()" style="cursor:pointer" class="st4" d="M947.3,43.8c-2.7-3.2-6.9-4.9-12.3-4.9c-25.9,0-51.8,0.1-77.7,0.1c-0.2,0,1.5,0,3.5,1

c0.6,0.3,1.3,0.8,2.8,2.1c2.2,2,3.5,3.5,3.5,3.5c2.1,2.4,4.3,4.7,6.3,7.1c3.8,4.4,4.1,4.3,7.8,8.5c1.8,2.1,4.6,5.2,7.8,9.2

c26.8,0.2,53.5,0.5,80.3,0.7h2L947.3,43.8z" />
                </g>
            </g>
            <g>

                <g>
                    <path @click="getSending()" style="cursor:pointer" class="st3" d="M865.5,43.4c-2.7-3.2-6.9-4.9-12.3-4.9c-25.9,0-51.8,0.1-77.7,0.1c1.2,2,2.4,4.1,3.5,6.3

c0.5,1,1,1.9,1.4,2.8c1.6,3.1,3.3,6.1,4.9,9.2c2.4,4.7,4.7,9.4,7.1,14.1c31.7-0.1,63.4-0.3,95.1-0.4h2L865.5,43.4z" />
                </g>
            </g>
            <g>

                <g>
                    <path @click="dialog = true" style="cursor:pointer" class="st3" d="M768.5,24.4c-2.7-5.6-6.9-8.4-12.3-8.4H575c-5.5,0-9.6,2.8-12.3,8.3l-24,46.7h2h249.8h2L768.5,24.4z" />
                </g>
            </g>
            <g>
                <path class="st5" d="M780.5,58.4c0-0.4,0-0.8-0.1-1.2l-2-0.3l1.2-1.6c-0.4-0.7-1-1.2-1.7-1.7l-1.6,1.2l-0.3-2

c-0.4-0.1-0.8-0.1-1.2-0.1s-0.8,0-1.2,0.1l-0.3,2l-1.6-1.2c-0.7,0.4-1.2,1-1.7,1.7l1.2,1.6l-2,0.3c-0.1,0.4-0.1,0.8-0.1,1.2

c0,0.4,0,0.8,0.1,1.2l2,0.3l-1.2,1.6c0.4,0.7,1,1.2,1.7,1.7l1.6-1.2l0.3,2c0.4,0.1,0.8,0.1,1.2,0.1s0.8,0,1.2-0.1l0.3-2l1.6,1.2

c0.7-0.4,1.2-1,1.7-1.7l-1.2-1.6l2-0.3C780.4,59.2,780.5,58.8,780.5,58.4z M774.7,60.7c-1.3,0-2.3-1-2.3-2.3c0-1.3,1-2.3,2.3-2.3

c1.3,0,2.3,1,2.3,2.3C777.1,59.7,776,60.7,774.7,60.7z" />
            </g>

            <image style="overflow:visible;" width="4292" height="4338" xlink:href="/chip/danger.png" @click="setFooterBetAmount(getCoins_modern[0])" transform="matrix(9.282807e-03 0 0 9.282807e-03 560.7209 20.7312)">
            </image>

            <image style="overflow:visible;" width="1213" height="1283" xlink:href="/chip/primary.png" @click="setFooterBetAmount(getCoins_modern[1])" transform="matrix(3.351435e-02 0 0 3.138645e-02 602.4175 20.7312)">
            </image>

            <image style="overflow:visible;" width="4292" height="4338" xlink:href="/chip/success.png" @click="setFooterBetAmount(getCoins_modern[2])" transform="matrix(9.260007e-03 0 0 9.260007e-03 644.6785 20.8301)">
            </image>

            <image style="overflow:visible;" width="1646" height="1629" xlink:href="/chip/warning.png" @click="setFooterBetAmount(getCoins_modern[3])" transform="matrix(2.471996e-02 0 0 2.471996e-02 685.0819 20.7312)">
            </image>

            <image style="overflow:visible;" width="1692" height="1742" xlink:href="/chip/black.png" @click="setFooterBetAmount(getCoins_modern[4])" transform="matrix(2.401468e-02 0 0 2.311643e-02 727.4645 20.7312)">
            </image>
            <text transform="matrix(1 0 0 1 574.6621 43.1016)" class="st5 st6 st7" style="cursor:pointer" @click="setFooterBetAmount(getCoins_modern[0])">{{getCoins_modern[0]}}</text>
            <text transform="matrix(1 0 0 1 617.3228 43.0352)" class="st5 st6 st7" style="cursor:pointer" @click="setFooterBetAmount(getCoins_modern[1])">{{getCoins_modern[1]}}</text>
            <text transform="matrix(1 0 0 1 656.8945 42.9043)" class="st5 st6 st7" style="cursor:pointer" @click="setFooterBetAmount(getCoins_modern[2])">{{getCoins_modern[2]}}</text>
            <text transform="matrix(1 0 0 1 698.2412 42.707)" class="st5 st6 st7" style="cursor:pointer" @click="setFooterBetAmount(getCoins_modern[3])">{{getCoins_modern[3]}}</text>
            <text transform="matrix(1 0 0 1 738.1426 43.627)" class="st5 st6 st7" style="cursor:pointer" @click="setFooterBetAmount(getCoins_modern[4])">{{getCoins_modern[4]}}</text>
            <text transform="matrix(1 0 0 1 420.8652 57.8574)" class="st5 st6 st8">$ {{getAllBettingAmount}}</text>
            <text transform="matrix(1 0 0 1 810.1836 56.0176)" class="st5 st6 st8" style="cursor:pointer" @click="getSending()">{{$t('msg.'+texts)}}</text>
            <text transform="matrix(1.2851 0 0 1 895.7578 56.6572)" class="st5 st6 st8" style="cursor:pointer" @click="clearDataMultiGameBet()">{{$t('msg.cancel')}}</text>
        </g>
    </svg> -->

    <!-- add chip setting -->
    <!-- <v-dialog v-model="dialog" max-width="900">
        <v-card-title small class="headline grey lighten-2" primary-title>
            Setting
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">X</v-btn>
        </v-card-title>
        <setting v-if="dialog" />
    </v-dialog> -->
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations,
    mapActions
} from "vuex";
import setting from "../modern/setting/chipamout";
export default {
    components: {
        setting
    },
    data() {
        return {
            isSending: false,
            dialog: false,
            texts: "confirm",
            imgChip: [{
                    title: "Danger",
                    img: "/chip/danger.png",
                    width: "55"
                },
                {
                    title: "Primary",
                    img: "/chip/primary.png",
                     width: "55"
                },
                {
                    title: "success",
                    img: "/chip/success.png",
                     width: "60"
                },
                {
                    title: "warning",
                    img: "/chip/warning.png",
                     width: "60"
                },
                {
                    title: "black",
                    img: "/chip/black.png",
                    width: "80"
                }
            ]
        }         

        
    },
    methods: {
        ...mapActions(["sendBetting"]),
        ...mapMutations(["setFooterBetAmount", "clearDataMultiGameBet"]),
        getSending() {
            this.isSending = true;
            this.texts = "sending";
            setTimeout(() => {
                this.sendBetting();
                this.isSending = false;
                this.texts = "confirm";
            }, 1000);
        }
    },
    computed: {
        ...mapGetters(["getCoins_modern", "checkFooterBet", "getAllBettingAmount"])
    }
};
</script>

<style scoped>
.footerBet{
    position:absolute;
    width: 100%;    
}
.amount div{
    margin:10px -15px;
    padding: 8px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-left:3px solid #aeadad;
    border-top:3px solid #aeadad;
    border-bottom:3px solid #aeadad;
    font-size: 30px;
    text-align: left;
    vertical-align: center;
    background-color: #FFF;
}
.chipsdiv{
    padding:5px;
    border-top-left-radius:50px;
    border-bottom-left-radius:50px;
    border-top-right-radius:50px;
    border-bottom-right-radius:50px;    
    border-right:3px solid #aeadad;
    border-left:3px solid #aeadad;
    border-top:3px solid #aeadad;
    border-bottom:3px solid #aeadad;
    background-color: #FFF;
}
.betButton div{
    padding:8px;
    margin:10px -20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;    
    border-right:3px solid #aeadad;
    border-top:3px solid #aeadad;
    border-bottom:3px solid #aeadad;
    background-color: #FFF;
}
.chips{
cursor: pointer;
margin:2px 5px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
-webkit-transition: -webkit-transform .8s ease-in-out;
          transition:         transform .8s ease-in-out;
}
.chips:hover{
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
  -ms-transform: rotate(360deg); /* IE 9 */
  transform: rotate(360deg);
}
.chipImg{
    color: #333;
    font-size: 24px;
}

.st0 {
    display: none;
}

.st1 {
    display: inline;
}

.st2 {
    fill: #C1272D;
}

.st3 {
    fill: #003F70;
}

.st4 {
    fill: #FF1D25;
}

.st5 {
    fill: #FFFFFF;
}

.st6 {
    font-family: 'MyriadPro-Regular';
}

.st7 {
    font-size: 7.0968px;
}

.st8 {
    font-size: 11.2821px;
}
</style>
