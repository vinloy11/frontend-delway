<template>
  <section class="main">
    <div class="title semi-bold top-margin-m bottom-padding-s">{{ words.account }}</div>
    <dw-input-text id="signUpLogin"
                   :label="words.login"
                   :focus="true"
                   :min-length="2"
                   valid="login"
                   type="text"
                   placeholder="Leemiant"/>
    <dw-input-text label="E-mail"
                   id="email"
                   valid="email"
                   type="text"
                   placeholder="zororomz@gmail.com"/>
    <dw-input-text id="signUpPassword"
                   :min-length="6"
                   :label="words.password" valid="password" type="password" placeholder="Введите пароль..."/>
    <dw-alert class="top-margin"/>
    <button
      :disabled="isValid === 1"
      @click="nextStep"
      class="btn big success width-100 top-margin">{{ words.continueRegistration }}
    </button>
  </section>
</template>

<script>
  import DwInputText from "../../inputs/DwInputText";
  import DwAlert from "../../DwAlert";
  export default {
    props: {
      signUpForm: {
        type: Object
      }
    },
    components: {
      DwInputText, DwAlert
    },
    computed: {
      words() {
        return this.$store.getters['translate/words']
      },
      isValid() {
        return this.$store.getters['errors/isValid'] ? 0 : 1
      }
    },
    methods: {
      nextStep() {
        this.$emit('nextStep')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 3rem 1rem 1rem 1rem;

    .title {
      line-height: 1rem;
      color: #3F4C67;
      font-weight: 600;
      border-bottom: 2px solid #ECEFF7;;
    }
  }
</style>
