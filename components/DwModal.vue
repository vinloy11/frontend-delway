<template>
  <modal :width="width ? width : ''" @openModal="open()" :name="name">
      Крестик
      <slot></slot>
  </modal>
</template>

<script>
  export default {
    props: {
      width: {
        type: String
      }
    },
    mounted() {
      this.$parent.$on('openModal', this.open);
      this.name = (Math.random() + new Date().getTime()).toString();
    },
    data() {
      return {
        name: ''
      }
    },
    methods: {
      open() {
        this.$modal.show(this.name)
      },
      close() {
        this.$modal.hide(this.name)
      }
    }
  }
</script>

<style scoped>

</style>
