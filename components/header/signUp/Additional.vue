<template>
  <section v-else class="additional">
    <back-arrow @click.prevent="back()" class="link absolute bold back-arrow rotate" />
    <span class="text-small gray semi-bold inline-block width-100 text-center">Дополнительно</span>
    <div class="title semi-bold top-margin-m bottom-padding-s">Личные данные</div>
    <dw-input-text id="signUpName"
                   ref="signUpName"
                   :focus="true"
                   label="Имя" type="text" placeholder="Артемий"/>
    <dw-input-text id="signUpSurname"
                   ref="signUpSurname"
                   label="Фамилия" type="text" placeholder="Лебедев"/>
    <div class="title semi-bold top-margin-m bottom-padding-s">Контакты</div>
    <dw-input-text id="signUpCountry"
                   ref="signUpCountry"
                   label="Страна" type="text" placeholder="Россия"/>
    <dw-input-text id="signUpCity"
                   ref="signUpCity"
                   label="Город" type="text" placeholder="Красноярск"/>
    <button
      @click="endRegistration"
      class="btn big  width-100 top-margin">Зарегестрироваться
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
      font-size: 14px;
      border-bottom: 2px solid #ECEFF7;;
    }
  }
</style>
