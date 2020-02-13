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
        <template v-if="$auth.loggedIn">
          <dw-user-inf/>
        </template>
        <template v-else>
          <dw-auth-button :type="'sign-in'"/>
          <dw-auth-button :type="'sign-up'"/>
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
      this.isAuth = await this.$store.getters['authUser/isAuthenticated'];
      const strategyKek = await this.$auth.strategy;
      console.log(strategyKek);
      this.user = await this.$store.dispatch('user/fetchUser');
    },
    components: {
      DwLogo, DwCreateProject, DwAuthButton, DwUserInf
    },
    data: () => {
      return {
        isAuth: null,
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
        console.log(user)
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
