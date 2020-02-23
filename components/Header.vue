<template>
  <header class="grid">
    <section class="grid-row align-items-center">
      <div data-column="6">
        <nuxt-link to="/">
          <dw-logo class="logo"/>
        </nuxt-link>
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
    async mounted() {
      this.$store.commit('form/getStorage');
      const strategyKek = await this.$auth.strategy;
      this.user = await this.$store.dispatch('user/fetchUser');
    },
    components: {
      DwLogo, DwCreateProject, DwAuthButton, DwUserInf
    },
    computed: {
      isAuth() {
        return this.$store.getters['authUser/isAuthenticated']
      }
    },
    data: () => {
      return {
        user: null,
        notifyCount: null,
        userInfo: {
          login: 'delayed',
          password: 'qwertY1$',
        }
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
    .logo {
      margin: 2rem 1.5rem;
    }
  }
</style>
