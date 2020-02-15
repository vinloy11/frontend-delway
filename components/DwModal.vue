<template>
  <modal
    :height="height"
    :width="width"
    :scrollable="scrollable"
    :adaptive="adaptive"
    @openModal="open()" :name="name">
    <div class="x-icon-wrapper top-margin right-margin">
      <dw-x-icon class="x-icon icon" @click="close"/>
    </div>
    <slot></slot>
  </modal>
</template>

<script>
  import DwXIcon from '~/assets/svg/x-icon.svg?inline'

  export default {
    components: {
      DwXIcon
    },
    props: {
      width: {
        type: String,
        default: '600'
      },
      height: {
        type: String,
        default: 'auto'
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      adaptive: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.$parent.$on('openModal', this.open);
      this.$parent.$on('closeModal', this.close);
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

<style lang="scss" scoped>
  .x-icon-wrapper {
    width: 1rem;
    height: 1rem;
    float: right;
    .x-icon {
      position: fixed;
    }
  }
</style>
