export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'var(--dark-blue)' },
  /*
  ** Global CSS
  */
  css: [
    '@/theme/index.scss',
    '@/theme/dw_button.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vue-lazyload",
    "@/plugins/vue-js-modal",
    '@/plugins/directives.js',
    '@/plugins/translate.js',
    '@/plugins/mask.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',


    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/profile',
            method: 'get',
            propertyName: false
          }
        },
        // tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://demo-rmcsapi.zimalab.com/api/',
    credentials: true
  },
  /*
  ** Build configuration
  */
  svgSprite: {
    // manipulate module options
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
}
