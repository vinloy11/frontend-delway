<template>
  <header class="grid">
    <section class="grid-row align-items-center">
      <div data-column="6">
        <nuxt-link to="/">
          <dw-logo class="logo"/>
        </nuxt-link>
      </div>
      <div data-column="6" class="flex content-end right-padding-m align-items-center">
        <template v-if="isAuth && user">
          <nuxt-link to="create" class="btn right-margin-m">Создать проект <span class="left-margin-s plus">&#43;</span></nuxt-link>
          <div class="notify pointer right-margin">
            <dw-notify />
          </div>
          <img class="pointer" width="48px" height="48px" :src="user.photo ? user.photo : lol" alt="">
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
      this.isAuth = await this.$store.getters['auth/isAuthenticated'];
      this.user = await this.$store.dispatch('user/fetchUser')
    },
    components: {
      DwLogo, DwAvatar, DwNotify
    },
    data: () => {
      return {
        lol: DwAvatar,
        isAuth: null,
        user: null
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
