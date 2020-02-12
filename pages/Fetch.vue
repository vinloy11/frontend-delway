<template>
  <div>
    <fetch-comp :name="name" />
  </div>
</template>

<script>
  import FetchComp from "../components/controls/FetchComp";
  export default {
    components: {FetchComp},
    asyncData({$axios}) {
      return $axios.get('https://api.myjson.com/bins/v9uzo')
        .then(res => res.data)
    },
  }
</script>

<style scoped>

</style>
