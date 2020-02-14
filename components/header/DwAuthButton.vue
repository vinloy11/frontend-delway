<template>
  <button @click="authInit()" :class="['btn', isSignIn ? 'sign-in default' : 'sign-up']">
    <span v-html="isSignIn ? 'Войти' : 'Зарегестрироваться'"/>
  </button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: true
      }
    },
    computed: {
      isSignIn() {
        return this.type === 'sign-in' ? 1 : 0
      }
    },
    methods: {
      async authInit() {
        if (this.isSignIn) {
          console.log('sign in')
          return
        }
        console.log('sign Up')
      }
    }
  }
</script>

<style scoped>
  .sign-up:after {
    content: 'd';
    color: transparent;
    width: 12px;
    height: 13px;
    padding-right: 10px;
    background: url(~assets/svg/authButton/arrow.svg) no-repeat 5px 5px;
    background-size: 14px;
  }
  .sign-in:before {
    content: 'w';
    color: transparent;
    width: 12px;
    height: 13px;
    padding-right: 9px;
    line-height: 1rem;
    padding-bottom: 1px;
    background: url(~assets/svg/authButton/person.svg) no-repeat ;
    background-size: 14px;
  }
</style>
