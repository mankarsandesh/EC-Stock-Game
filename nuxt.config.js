const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

import config from "./config/config.global";

module.exports = {
    mode: "spa",
    buildModules: [
        // Simple usage
        "@nuxtjs/dotenv"

        // With options
        // ['@nuxtjs/dotenv', { /* module options */ }]
    ],

  /*
   ** Customize the progress-bar color
   */
  loading: "~/components/loaders/PageTransition.vue",
  loadingIndicator: {
    name: "~/components/loaders/PageLoader.html",
    color: "#FDFEFE",
    background: "#2980b9"
  },
  pageTransition: {
    name: "fade",
    mode: "out-in"
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/style/media-query.css",
    "~/assets/style/main.css",
    "~/assets/style/main.scss",
    "~/assets/style/app.styl"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/inject.js",
    "@/plugins/vuetify",
    "@plugins/maintenance",
    "@plugins/js-cookie", // for setting and reading cookies
    // "~/plugins/axios",
    "@/plugins/roarr", // for generating logs
    "@plugins/secure-storage", // for encrypting local storage
    "@/plugins/filters",
    //{ src: "~/plugins/vuex-persist", ssr: false }, // for making vuex state persistent
    "@/plugins/i18n",
    "@/plugins/login.js", // login plugin
    "@/plugins/chart",
    "@/plugins/sweetAlert",
    "@/plugins/vueScreen",
    "@/plugins/socketio",
    { src: "@/plugins/vChart", mode: "client" },
    { src: "@/plugins/ga", mode: "client" }
  ],
  router: {
    middleware: ["auth", "showLoading"]
    // middleware: 'maintenance'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/font-awesome",
    "@nuxtjs/moment",
    //['vue-wait/nuxt', { useVuex: true }],
    [
      "nuxt-fontawesome",
      {
        component: "fa",
        imports: [
          //import whole set
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"]
          }
        ]
      }
    ]
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: "http://uattesting.equitycapitalgaming.com/webApi",
  },

    /*
     ** Customize the progress-bar color
     */
    loading: "~/components/loaders/PageTransition.vue",
    loadingIndicator: {
        name: "~/components/loaders/PageLoader.html",
        color: "#FDFEFE",
        background: "#2980b9"
    },
    pageTransition: {
        name: "fade",
        mode: "out-in"
    },
    /*
     ** Global CSS
     */
    css: [
        "~/assets/style/media-query.css",
        "~/assets/style/main.css",
        "~/assets/style/main.scss",
        "~/assets/style/app.styl"
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/inject.js',
        "@/plugins/vuetify",
        "@plugins/js-cookie", // for setting and reading cookies
        // "~/plugins/axios",
        "@/plugins/roarr", // for generating logs
        "@plugins/secure-storage", // for encrypting local storage
        "@/plugins/filters",
        // { src: "~/plugins/vuex-persist", ssr: false }, // for making vuex state persistent
        "@/plugins/i18n",
        "@/plugins/login.js", // login plugin
        "@/plugins/chart",
        "@/plugins/sweetAlert",
        "@/plugins/vueScreen",
        "@/plugins/socketio",
        { src: "@/plugins/vChart", mode: "client" },
        { src: "@/plugins/ga", mode: "client" }
    ],
    router: {
        middleware: ["auth", "showLoading"]
            // middleware: 'maintenance'
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        "@nuxtjs/font-awesome",
        "@nuxtjs/moment",
        //['vue-wait/nuxt', { useVuex: true }],
        [
            "nuxt-fontawesome",
            {
                component: "fa",
                imports: [
                    //import whole set
                    {
                        set: "@fortawesome/free-solid-svg-icons",
                        icons: ["fas"]
                    }
                ]
            }
        ]
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        // baseURL: "http://uattesting.equitycapitalgaming.com/webApi",
    },

    /*
     ** Build configuration
     */
    extend: function(config, { isDev, isClient }) {
      if (isDev) {
        config.devtool = isClient ? "source-map" : "inline-source-map";
      }
      config.node = {
        fs: "empty"
      };
    }
  },
  server: config.serverConfig
};
