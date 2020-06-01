<template>
  <div md8 lg8>
    <div>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex>
            <h2 class="display-1">{{ $t("msg.ecGamingRulesDescription") }}</h2>
            <p class="subheading">{{ $t("msg.textInfoRule") }}</p>
            <v-dialog v-model="dialog" width="600">
              <template v-slot:activator="{ on }">
                <v-btn class="accept" color="buttonGreen" dark v-on="on">{{
                  $t("msg.resultIntroduction")
                }}</v-btn>
              </template>
              <v-card class="ruleModel" style="border-radius:10px;">
                <v-icon
                  class="closePopup close-button topright v-icon closePopup v-icon--link material-icons theme--light"
                  style="position:right;"
                  color="#808080 !important"
                  @click="dialog = false"
                  >close</v-icon
                >
                <v-card-title
                  class="headline lighten-2"
                  style="border-radius:10px; color:#0b2a68;"
                  primary-title
                >
                  <b>{{ $t("msg.introduction") }}</b>
                </v-card-title>
                <v-card-text>
                  <p style="line-hight:15px;text-align:center;font-size:18px;">
                   {{ $t('msg.textResultIntroduction')}}
                  </p>     
                  <div class="text-xs-center">
                    <v-btn
                      class="accept"
                      color="buttonGreen"
                      dark
                      @click="dialog = false"
                      >{{ $t("msg.accept") }}</v-btn
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <onlyrule />
  </div>
</template>

<script>
import onlyrule from "~/components/modern/rule/onlyrule";
export default {
  components: {
    onlyrule
  },
  data() {
    return {
      dialog: false,
      panel: [0]
    };
  }
};
</script>

<style>
.ruleHeading {
  background-color: #0b2a68 !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ffffff !important;
  text-transform: capitalize;
}
.close-button {
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  position: absolute;
}

.topright {
  position: absolute;
  right: 0px;
  top: 0px;

  background-color: #fff;
  border-top-right-radius: 10px;
}

.accept {
  min-width: 100px;
  min-height: 25px;
}
</style>
