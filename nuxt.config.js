const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
    mode: "spa",
    buildModules: [
        // Simple usage
        '@nuxtjs/dotenv'
    
        // With options
        // ['@nuxtjs/dotenv', { /* module options */ }]
    ],

    /*
     ** Headers of the page
     */
    head: {
        title: "EC Gaming",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: pkg.description }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,500i,700,900&display=swap"
            }
        ],
        script: [{
            src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
        }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: false,
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
        "@/plugins/vuetify",
        "@/plugins/filters",
        "@/plugins/callApi",
        "@/plugins/i18n",
        "@/plugins/chart",
        "@/plugins/sweetAlert",
        "@/plugins/vueScreen",
        "@/plugins/socketio",
        { src: "@/plugins/vChart", mode: 'client' }
    ],
    router: {
        middleware: ["auth", "showLoading"]
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        "@nuxtjs/font-awesome",
        '@nuxtjs/moment',
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: "http://159.138.45.25",
        // baseURL: "http://uattesting.equitycapitalgaming.com/webApi",
    },

    /*
     ** Build configuration
     */
    build: {
        transpile: [
            'vuetify/lib',
            '@rabota/yandex-metrika'
        ],
        plugins: [new VuetifyLoaderPlugin()],
        loaders: {
            stylus: {
                import: ["~assets/style/variables.styl"]
            }
        },

        /*
         ** You can extend webpack config here
         */
        extend: function (config, { isDev, isClient }) {
            if (isClient) {
                config.devtool = '#source-map'
            }
            config.node = {
                fs: "empty"
            };
        }
    },
    server: {
        port: 8000, // default: 3000

        host: "0.0.0.0" // default: localhost
    } // other configs
}