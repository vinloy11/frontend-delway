<template>
  <section class="width-100 text-center error  bold height-normal">
<!--    <span v-for='(error, index) in errors' :key='index'>{{ error }}</span>-->
    {{ $store.getters['errors/ids'] }}
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([ 'errors', 'hints' ])
    }
  }
</script>

<style scoped>
  .error {
    color: var(--error);
    border: 2px solid var(--error);
    padding: calc(1rem - 2px);
  }
</style>
