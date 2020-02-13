<template>
  <button :class="['btn', isSinIn ? 'sign-in default' : 'sign-up']"><span v-html="isSinIn ? 'Войти' : 'Зарегестрироваться'"/></button>
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
      isSinIn() {
        return this.type === 'sign-in' ? 1 : 0
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
    background-image: url(~assets/svg/authButton/arrow.svg);
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
