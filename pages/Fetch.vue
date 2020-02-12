<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    asyncData() {
      return axios.get('https://api.myjson.com/bins/v9uzo')
        .then(res => res.data)
    },
  }
</script>

<style scoped>

</style>
