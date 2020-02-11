<template>
  <header class="grid">
    <section class="grid-row align-items-center">
      <div data-column="6">
        <nuxt-link to="/">
          <dw-logo class="logo"/>
        </nuxt-link>
      </div>
      <div data-column="6" class="flex content-end right-padding-m align-items-center">
        <template v-if="!$auth.loggedIn">
          <nuxt-link to="create" class="btn right-margin-m">Создать проект <span class="left-margin-s plus">&#43;</span>
          </nuxt-link>
          <div class="notify pointer right-margin">
            <dw-notify/>
          </div>
          <img class="pointer" width="48px" height="48px" :src=" lol" alt="">
        </template>
        <template v-else>
          <form @submit.prevent="submitForm(userInfo)">
            <input type="text" v-model="userInfo.login" value="delayed">
            <input type="text" v-model="userInfo.password" value="qwertY1$">
            <button >Login</button>
          </form>
        </template>
      </div>


    </section>
  </header>
</template>

<script>
  import DwLogo from '~/assets/svg/logo.svg?inline';
  import DwAvatar from '~/assets/svg/user/user.svg?raw';
  import DwNotify from '~/assets/svg/user/notify.svg?inline';

  export default {
    async mounted() {
      this.isAuth = await this.$store.getters['authUser/isAuthenticated'];
      this.user = await this.$store.dispatch('user/fetchUser');
      const strategyKek = await this.$auth.strategy;
      console.log(strategyKek)
    },
    components: {
      DwLogo, DwAvatar, DwNotify
    },
    data: () => {
      return {
        lol: DwAvatar,
        isAuth: null,
        user: null,
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
          })
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

    .plus {
      display: inline-block;
      max-height: 1rem;
      vertical-align: middle;
      font-size: 1rem;
      font-weight: 600;
    }
  }
</style>
