<template>
  <section v-else class="additional">
    <back-arrow @click.prevent="back()" class="link absolute bold back-arrow rotate" />
    <span class=" gray semi-bold inline-block width-100 text-center">{{ words.additionally }}</span>
    <div class="title semi-bold top-margin-m bottom-padding-s">{{ words.personalData }}</div>
    <dw-input-text id="signUpName"
                   ref="signUpName"
                   :focus="true"
                   :label="words.name" type="text" placeholder="Артемий"/>
    <dw-input-text id="signUpSurname"
                   ref="signUpSurname"
                   :label="words.surname" type="text" placeholder="Лебедев"/>
    <div class="title semi-bold top-margin-m bottom-padding-s">{{ words.contacts }}</div>
    <dw-input-text id="signUpCountry"
                   ref="signUpCountry"
                   :label="words.country" type="text" placeholder="Россия"/>
    <dw-input-text id="signUpCity"
                   ref="signUpCity"
                   :label="words.city" type="text" placeholder="Красноярск"/>
    <button
      @click="endRegistration"
      class="btn big  width-100 top-margin">{{ words.signUp }}
    </button>
  </section>
</template>

<script>
  import DwInputText from "../../inputs/DwInputText";
  import BackArrow from '~/assets/svg/authButton/arrow.svg?inline';
  export default {
    props: {
      signUpForm: {
        type: Object
      }
    },
    components: {
      DwInputText, BackArrow
    },
    computed: {
      words() {
        return this.$store.getters['translate/words']
      }
    },
    methods: {
      endRegistration() {
        this.back();
        this.$emit('closeModal');
        this.$store.dispatch('authUser/login', {});
      },
      back() {
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
