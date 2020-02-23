<template>
  <dw-modal :width="modalWidth" :name="isSignIn ? 'sign-in' : ''"  class="modal">
    <div class="sign-in content" v-if="isSignIn">
      <section v-if="forgotPassword">
        <h2 class="text-center">Восстановление пароля</h2>
        <back-arrow @click.prevent="forgotPassword = !forgotPassword" class="link absolute bold back-arrow rotate" />
        <dw-input-text id="email" :focus="true"
                       label="E-mail" valid="email" type="text" placeholder="zororomz@gmail.com"/>
        <button
          @click="mainBlock = !mainBlock"
          class="btn warning big width-100 top-margin sign-up">Отправить пароль
        </button>
      </section>
      <section v-else>
        <h1 class="text-center">Авторизация</h1>
        <dw-input-text label="E-mail"
                       id="email"
                       :focus="true"
                       valid="email" type="text"
                       placeholder="zororomz@gmail.com"/>
        <dw-input-text label="Пароль"
                       id="signInPassword"
                       valid="password" type="password"
                       placeholder="Введите пароль..."/>
        <dw-alert v-if="error" class="top-margin">Неправильный логин или пароль</dw-alert>
        <button
          :disabled="isValid === 1"
          @click="error = !error"
          class="btn big success width-100 top-margin">Войти
        </button>
        <div class="width-100 text-center top-margin text-small semi-bold">
          <a @click.prevent="forgotPassword = !forgotPassword" href class="link">Забыли пароль?</a></div>
        <button
          @click="goToSignUp"
          class="btn big  width-100 top-margin sign-up">Зарегестрироваться
        </button>
      </section>
    </div>
    <div class="sign-up content " v-else>
      <h1 class="text-center">Регистрация</h1>
      <component @closeModal="close" @nextStep="nextBlock()"  :is="mainBlock ? mainSignUp : Additional"/>
    </div>
  </dw-modal>
</template>

<script>
  import DwInputText from "../inputs/DwInputText";
  import DwAlert from "../DwAlert";
  import Additional from "./signUp/Additional";
  import BackArrow from '~/assets/svg/authButton/arrow.svg?inline';
  export default {
    props: {
      isSignIn: {
        required: true
      }
    },
    components: {
      DwInputText, DwAlert, Additional, BackArrow,
      DwModal: () => import("../DwModal")
    },
    data() {
      return {
        disabled: 0,
        error: true,
        Additional: Additional,
        signUpComponent: null,
        name: '',
        modalWidth: '416',
        mainBlock: true,
        forgotPassword: false,
        mainSignUp: null,
      }
    },
    async mounted() {
      this.mainSignUp = () => import(`~/components/header/signUp/Main.vue`);
      this.signUpComponent = () => this.dynamicComponent();
      this.$parent.$on('openModal', this.open);
      this.name = (Math.random() + new Date().getTime()).toString();
    },
    computed: {
        isValid() {
          return this.$store.getters['errors/isValid'] ? 0 : 1
        }
    },
    methods: {
      dynamicComponent() {
        return this.mainBlock ? this.mainSignUp : this.Additional
      },
      open() {
        this.$emit('openModal');
      },
      close() {
        this.$emit('closeModal');
      },
      nextBlock() {
        this.mainBlock = !this.mainBlock;
      },
      goToSignUp() {
        this.$emit('goToSignUp');
        this.$store.commit('errors/removeHints');
      }
    },
  }



</script>

<style lang="scss" scoped>
  .modal {
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
  }
</style>
