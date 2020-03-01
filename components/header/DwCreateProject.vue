<template>
  <a ref="link" @click.prevent="createProject()" href="/projects/create" class="btn right-margin-m">
    <span >{{ words.createProject }}</span>
    <span class="left-margin-s plus">&#43;</span>
  </a>
</template>

<script>

  export default {
    methods: {
      createProject() {
        if (this.isAuth) {
          this.$router.push({ path: '/projects/create' });
          return
        }
        const link = this.$refs.link.getAttribute('href');
        const history = {
          path: link,
          params: this.$route.params
        };
        this.$cookies.set('history', JSON.stringify(history), {
          path: '/',
          maxAge: 60 * 60
        });
        this.$root.$emit('openSignIn');
      }
    },
    computed: {
      words() {
        return this.$store.getters['translate/words']
      },
      isAuth() {
        return this.$store.getters['authUser/isAuthenticated']
      },
    }
  }
</script>

<style lang="scss" scoped>
  a {
    font-size: 0.8rem;
  }
  .plus {
    vertical-align: middle;
    font-size: 15px;
  }
</style>
