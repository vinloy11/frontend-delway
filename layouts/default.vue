<template>
  <section class="grid">
    <div class="grid-row">
      <Header data-column="12"/>
    </div>
    <div class="grid-row content">
      <nuxt data-column="12"/>
    </div>
  </section>
</template>

<script>
  import Header from "../components/Header";
  export default {
    components: { Header },
  }
</script>

<style lang="scss">

</style>
