<template>
  <div>
    <button @click="authInit()" :class="['btn', isSignIn ? 'sign-in default' : 'sign-up']">
      <span v-html="isSignIn ? 'Войти' : 'Зарегестрироваться'"/>
    </button>
    <dw-modal width="656">
      <div v-if="isSignIn">
        sign in
      </div>
      <div v-else>
        sign up
      </div>
    </dw-modal>
  </div>
</template>

<script>
  import DwModal from "../DwModal";
  export default {
    components: { DwModal },
    props: {
      btnType: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true,
      }
    },
    mounted() {
        this.name = (Math.random() + new Date().getTime()).toString();
    },
    data() {
      return {
        name: ''
      }
    },
    computed: {
      isSignIn() {
        return this.btnType === 'sign-in' ? 1 : 0
      },
      isStart() {
        return this.state === 'start' ? 1 : 0
      }
    },
    methods: {
      async authInit() {
        if (this.isStart) {
          this.$emit('openModal');
          // this.$modal.show(this.name);
          return
        }
        if (this.isSignIn) {
          console.log('sign in');
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
    background: url(~assets/svg/authButton/person.svg) no-repeat;
    background-size: 14px;
  }
</style>
