const port = process.env.PORT || 8000
export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      }
    ]
  },

  modules: [

  ],


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~layouts/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://localhost:7000'
    
  },



  router: {
    base: "/",
  
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post',
            propertyName:'token',
            required: true
          },  
          user:{
            url: 'api/auth/user',
            method: 'post',
            propertyName: 'user'
          },
          logout: {
            url: 'api/auth/logout',
            method: 'POST' 
          }
        }
      }
    }
  },

  serverMiddleware: 
  ['~/api/app.js'],

  server: {
    port: process.env.PORT
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


}
