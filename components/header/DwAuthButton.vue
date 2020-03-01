<template>
  <div>
    <button @click="btnType === 'sign-in' ? authInit('sign-in') : authInit('sign-up')"
            :class="['btn', btnType === 'sign-in' ? 'sign-in default' : 'sign-up']">
      <span v-html="btnType === 'sign-in' ? words.signIn : words.signUp "/>
    </button>
    <component @goToSignUp="authInit('sign-up')" :is-sign-in="isSignIn" :is="authUser"/>
  </div>
</template>

<script>
  export default {
    props: {
      btnType: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isSignIn: null
      }
    },
    asyncData() {
      // this.$options.components['DwModal'] = () => require('../DwModal.vue')
    },
    created() {
      this.isSignIn = this.btnType === 'sign-in' ? 1 : 0
    },
    mounted() {
      this.name = (Math.random() + new Date().getTime()).toString();
    },
    watch: {
      forgotPassword() {
        this.forgotPassword ? this.modalWidth = '496' : this.modalWidth = '416'
      }
    },
    computed: {
      isStart() {
        return this.state === 'start' ? 1 : 0
      },
      words() {
        return this.$store.getters['translate/words']
      }
    },
    methods: {
      async authInit(method) {
        this.isSignIn = method === 'sign-in' ? 1 :  0;
        return this.$emit('openModal');
      },
      async authUser() {
        return import(`~/components/header/DwAuthUser.vue`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
    &.sign-up:after {
      content: 'd';
      color: transparent;
      width: 12px;
      height: 13px;
      padding-right: 10px;
      background: url(~assets/svg/authButton/arrow.svg) no-repeat 5px 5px;
      background-size: 14px;
    }

    &.sign-in:before {
      content: 'w';
      color: transparent;
      width: 12px;
      height: 13px;
      padding-right: 9px;
      line-height: 1rem;
      padding-bottom: 1px;
      background: url(~assets/svg/authButton/person.svg) no-repeat;
      background-size: 14px;
    }
  }

</style>
