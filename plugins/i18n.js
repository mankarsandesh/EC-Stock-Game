import Vue from "vue";
import VueI18n from "vue-i18n";
import secureStorage from "./secure-storage";
import config from "../config/config.global";

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Detect Browser language

  // var userLang = navigator.language || navigator.userLanguage;
  // var browserLanguage = "cn";
  // if (userLang == "en-US" || userLang == "en-GB") {
  //   browserLanguage = "us";
  // } else if (userLang == "lo") {
  //   browserLanguage = "la";
  // } else if (userLang == "th") {
  //   browserLanguage = "th";
  // }
  // secureStorage.setItem("lang", browserLanguage);
  var userLang = navigator.language || navigator.userLanguage;
  secureStorage.removeItem("lang");
  if (userLang == "en-US" || userLang == "en-GB") {
    var browserLanguage = "us";
  } else if (userLang == "lo") {
    var browserLanguage = "la";
  } else if (userLang == "th") {
    var browserLanguage = "th";
  } else {
    var browserLanguage = "cn";
  }

  if (secureStorage.getItem("lang")) {
    var newLanguage = secureStorage.getItem("lang");
  } else {
    var newLanguage = browserLanguage;
  }

  store.dispatch("setLanguage", newLanguage);

  app.i18n = new VueI18n({
    locale: newLanguage || config.defaultLanguageLocale,
    fallbackLocale: config.defaultLanguageLocale,
    messages: {
      us: require("~/locales/us.json"),
      cn: require("~/locales/cn.json"),
      th: require("~/locales/th.json"),
      la: require("~/locales/la.json")
    }
  });

  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
