<template>
  <div xs12>
    <h1 class="jumbotron-heading text-center">
      {{ $t("msg.ecGamingRulesDescription") }}
    </h1>
    <p class="lead text-muted text-center">{{ $t("msg.textInfoRule") }}</p>
    <div class="text-xs-center">
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on }">
          <v-btn color="buttonGreen" dark v-on="on">{{
            $t("msg.resultIntroduction")
          }}</v-btn>
        </template>

        <v-card>
          <v-card-title
            class="headline lighten-2"
            style="color:#0b2a68;"
            primary-title
          >
            <b>{{ $t("msg.introduction") }}</b>
          </v-card-title>
          <v-card-text>
            <!-- {{$t('msg.textResultIntroduction')}} -->
            <v-icon
              class="closePopup close-button topright v-icon closePopup v-icon--link material-icons theme--light"
              style="position:right;"
              color="#808080 !important"
              @click="dialog = false"
              >close</v-icon
            >

            <p style="line-hight:15px;text-align:center;font-size:16px;">
              {{ $t("msg.textResultIntroduction") }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="accept"
              color="buttonGreensmall"
              dark
              @click="dialog = false"
              >{{ $t("msg.accept") }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-card>
      <onlyrules />
    </v-card>
  </div>
</template>

<script>
import onlyrules from "~/components/mobile/onlyrule";
import breadcrumbs from "~/components/mobile/mobilebreadcrumbs";
export default {
  components: {
    onlyrules,
    breadcrumbs
  },
  data() {
    return {
      dialog: false,
      panel: [0]
    };
  }
};
</script>

<style scoped>
.flex-column {
  flex-direction: column !important;
}

.text-warning {
  color: darkorange;
}

.text-bluelight {
  color: blue;
}

.text-info {
  color: rgb(19, 116, 116);
}

.text-secondary {
  color: sandybrown;
}

.text-danger {
  color: red;
}

.accept {
  min-width: 80px;
  min-height: 25px;
}
</style>
