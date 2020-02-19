<template>
  <section v-else class="additional">
    <span class="text-small gray semi-bold inline-block width-100 text-center">Дополнительно</span>
    <div class="title semi-bold top-margin-m bottom-padding-s">Личные данные</div>
    <dw-input-text :value="signUpForm.name"
                   id="signUpName"
                   @input="signUpForm.name = $event"
                   label="Имя" type="text" placeholder="Артемий"/>
    <dw-input-text :value="signUpForm.surname"
                   id="signUpSurname"
                   @input="signUpForm.surname = $event"
                   label="Фамилия" type="text" placeholder="Лебедев"/>
    <div class="title semi-bold top-margin-m bottom-padding-s">Контакты</div>
    <dw-input-text :value="signUpForm.country"
                   id="signUpCountry"
                   @input="signUpForm.country = $event"
                   label="Страна" type="text" placeholder="Россия"/>
    <dw-input-text :value="signUpForm.city"
                   id="signUpCity"
                   @input="signUpForm.city = $event"
                   label="Город" type="text" placeholder="Красноярск"/>
    <button
      @click="nextStep"
      class="btn big  width-100 top-margin">Зарегестрироваться
    </button>
  </section>
</template>

<script>
  import DwInputText from "../../inputs/DwInputText";
  export default {
    props: {
      signUpForm: {
        type: Object
      }
    },
    components: {
      DwInputText
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
      font-size: 14px;
      border-bottom: 2px solid #ECEFF7;;
    }
  }
</style>
