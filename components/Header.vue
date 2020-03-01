<template>
  <header :class="['grid', isAuth ? 'auth' : '']">
    <section class="grid-row align-items-center">
      <div data-column="6">
        <nuxt-link to="/">
          <dw-logo class="logo"/>
        </nuxt-link>
        <select v-model="asa">
          <option disabled value="">Язык</option>
          <option>en</option>
          <option>ru</option>
          <option>fr</option>
        </select>
      </div>
      <div data-column="6" class="flex content-end right-padding-m align-items-center">
        <dw-create-project/>
        <template v-if="isAuth">
          <dw-user-inf/>
        </template>
        <template v-else>
          <dw-auth-button  state="start" btn-type="sign-in"/>
          <dw-auth-button  state="start" btn-type="sign-up"/>
        </template>
      </div>
    </section>
  </header>
</template>

<script>
  import DwLogo from '~/assets/svg/logo.svg?inline';
  import DwCreateProject from "./header/DwCreateProject";
  import DwAuthButton from "./header/DwAuthButton";
  import DwUserInf from "./header/DwUserInf";

  export default {
    components: {
      DwLogo, DwCreateProject, DwAuthButton, DwUserInf
    },

    beforeCreate() {
      // this.$store.dispatch('translate/translatePage');
    },

    async mounted() {
      this.$store.commit('form/getStorage');
      const strategyKek = await this.$auth.strategy;
      this.user = await this.$store.dispatch('user/fetchUser');
    },

    computed: {
      isAuth() {
        return this.$store.getters['authUser/isAuthenticated']
      }
    },
    data: () => {
      return {
        asa: '',
        user: null,
        notifyCount: null,
        userInfo: {
          login: 'delayed',
          password: 'qwertY1$',
        }
      }
    },
    watch: {
      asa() {
        this.$cookies.set('selectLang', JSON.stringify(this.asa), {
          path: '/',
          maxAge: 60 * 60
        });
        this.$store.commit('translate/toggleTranslated');
        this.$store.dispatch('translate/translatePage');
      }
    },
    methods: {
      submitForm(user) {
        this.$auth.loginWith('local', {
          data: user
        });
      },
      async logout() {
        await this.$auth.logout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    padding: 1rem 0 1rem 1.5rem;
    background-color: var(--white);
    &.auth {
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
    .logo {

    }
  }
</style>
