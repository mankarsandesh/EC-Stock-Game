<template>
<div>
    <v-card class="my-bg pa-5" style="background-color: #f2f4ff !important;">
        <v-layout row wrap justify-center>
            <div>
                <v-flex class="setting_container">
                    <span class="pt-1">{{$t('msg.music')}}</span>
                    <label class="switch">
                        <input  type="checkbox" ref="isSound" :checked="getUserInfo.isSound"/>
                        <span class="slider round"></span>
                    </label>
                </v-flex>
            </div>
        </v-layout>
        <!-- <v-slider v-model="length" color="#003e70" min="1" max="15" :label="$t('msg.customlength')"></v-slider> -->
        <v-layout row wrap justify-center>
            <v-btn class="my-btn buttonGreensmall" @click="updateSetting"  >{{$t('msg.save')}}</v-btn>
            <v-btn class="my-btn buttonCancel">{{$t('msg.cancel')}}</v-btn>
        </v-layout>
    </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import config from "../../config/config.global";

export default {
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
  },
  methods: {
    ...mapActions(["asynUserInfo"]),
    async updateSetting() {
      let isSound = this.$refs.isSound.checked ? true : false;
    
    try{
      let userSetting = {
        portalProviderUUID: this.getPortalProviderUUID,
        userUUID: this.getUserUUID,
        version: config.version,
        isSound
      };
      const res =await this.$axios.$post(
        config.updateUserSetting.url,
        userSetting,
        {
          headers: config.header
        }
      );
      if (res.code == 200) {
        this.$swal.fire({
          position: "top",
          type: "success",
          title: "Changes saved",
          showConfirmButton: "false",
          timer:1000
        });
        this.asynUserInfo();
        // console.log(res);
      } else {
        // console.log(res);
        // this.$alert("Alert message.");
      }
    } catch (ex) {
      console.log(ex);
      alert(ex.message);
    }
    },
  }
};
    
</script>

<style scoped>
.title_container {
    padding-top: 15px;
    padding-bottom: 15px;
    text-transform: capitalize;
}

.setting_container {
    margin-left: 5px;
    margin-bottom: 15px;
    position: relative;
    width: 200px;
    padding: 10px;
    padding-left: 15px;
    border-width: 1px;
    border-style: solid;
    border-color: #bdbec1;
    border-radius: 10px;
}

/* switch */
.switch {
    position: relative;
    float: right;
    top: -1px;
    display: inline-block;
    width: 60px;
    height: 32px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 10%;
    right: 0;
    bottom: 0;
    background-color: #f4f6fd;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    box-shadow: 0 0 5px #bdbec1;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 3px;
    background-color: #a8a7a8;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked+.slider::before {
    background-color: #38b062;
}

input:checked+.slider {
    background-color: white;
}

input:focus+.slider {
    box-shadow: 0 0 1px gra;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
