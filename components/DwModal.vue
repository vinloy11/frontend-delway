<template>
  <modal
    :height="height"
    :width="width"
    :scrollable="scrollable"
    :adaptive="adaptive"
    @before-close="beforeClose"
    @closed="closed"
    @openModal="open()" :name="getName">
    <div class="x-icon-wrapper top-margin right-margin">
      <dw-x-icon class="x-icon icon" @click="close"/>
    </div>
    <slot @closeModal="close"/>
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
      },
      name: {
        type: String
      }
    },
    mounted() {
      this.$parent.$on('openModal', this.open);
      this.$parent.$on('closeModal', this.close);
      this.$root.$on('openSignIn', this.openSignIn)
      // this.randName = ;
    },
    data() {
      return {
        randName: (Math.random() + new Date().getTime()).toString()
      }
    },
    computed: {
      getName() {
        return this.name ? this.name : this.randName
      }
    },
    methods: {
      openSignIn() {
        console.log('lel')
        this.$modal.show('sign-in');
      },
      open() {
        console.log(this.getName);
        this.$modal.show(this.getName)
      },
      close() {
        this.$modal.hide(this.getName)
      },
      beforeClose(event) {
        // await this.$store.commit('errors/removeHints');
      },
      closed() {
        this.$store.commit('errors/removeHints');
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
