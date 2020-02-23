<template>
  <div>
    Create
  </div>
</template>

<script>
  export default {
    middleware: ['user-auth'],
    mounted() {
      console.log('kekek')
    },
  }
</script>

<style scoped>

</style>
