<template>
  <div>
    <h1>Vue Lazyload Demo</h1>
    <template v-if="time > 0"><dw-auth-button :typeof="'sign-in'" >Kek lol</dw-auth-button></template>
    <modal name="example"
           :width="300"
           :height="300"
           @before-open="beforeOpen"
           @before-close="beforeClose">
      <b>{{time}}</b>
      <dw-auth-button />

    </modal>
    <button @click="show()" class="btn">Modal open</button>
    <div class="grid">
      <div
        v-for="(item, index) in img"
        :key="index"
        class="border-primary card"
      >
        <img v-lazy="item" class="img-fluid" />
      </div>
    </div>
    <dw-logo/>
  </div>
</template>

<script>
  import DwAuthButton from "~/components/header/DwAuthButton";
  import DwLogo from '~/assets/svg/logo.svg?inline';
  import Header from "../components/Header";
  export default {
    components: {
      DwLogo,
      DwAuthButton,
      Header
    },
    data() {
      return {
        time: 0,
        duration: 5000,
        img: [
          "https://placeimg.co/450/450/animals",
          "https://placeimg.com/450/450/arch",
          "https://placeimg.com/450/450/nature",
          "https://placeimg.com/450/450/people",
          "https://placeimg.com/450/450/tech"
        ]
      };
    },
    methods: {
      show () {
        this.$modal.show('hello-world');
      },
      hide () {
        this.$modal.hide('hello-world');
      },
      beforeOpen (event) {
        console.log(event)
        // Set the opening time of the modal
        this.time = Date.now()
      },
      beforeClose (event) {
        console.log(event)
        // If modal was open less then 5000 ms - prevent closing it
        if (this.time + this.duration < Date.now()) {
          event.stop()
        }
      },
      show() {
        this.$modal.show('example')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    row-gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      column-gap: 2.5rem;
    }
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
