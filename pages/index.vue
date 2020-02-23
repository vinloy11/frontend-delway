<template>
  <div>Main page
  </div>

</template>
<script>
  import Cookies from 'js-cookie'
  export default {
    components: {
    },
    data() {
      return {
        isSignIn: null
      }
    },
    mounted() {
      const { message } = this.$route.query;
      switch (message) {
        case 'login':
          // console.log(window.history)
          // console.log(this.$router)
          setTimeout(() => {
            console.log(this.$store.getters['history/oldValue']);
            this.$root.$emit('openSignIn');
          })
          console.log('Для начала войдите в систему');
          break;
        case 'logout':
          console.log('Вы успешно вышли из системы');
          break;
        case 'session':
          console.log('Время сессии истекло, пожалуйста зайдите заного');
          break;
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
