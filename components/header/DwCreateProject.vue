<template>
  <a @click="createProject" class="btn right-margin-m">
    <span>Создать проект</span>
    <span class="left-margin-s plus">&#43;</span>
  </a>
</template>

<script>
    export default {
      methods: {
        createProject() {
          if (this.isAuth) {
            this.$router.push({path: '/projects/create'})
          }
        }
      },
      computed: {
        isAuth() {
          return this.$store.getters['authUser/isAuthenticated']
        }
      }
    }
</script>

<style lang="scss" scoped>
  .plus {
    vertical-align: middle;
    font-size: 15px;
  }
</style>
