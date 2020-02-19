<template>
  <dw-modal :width="modalWidth" class="modal">
    <div class="sign-in content" v-if="isSignIn">
      <section v-if="forgotPassword">
        <h2 class="text-center">Восстановление пароля</h2>
        <dw-input-text id="passwordRecovery"
                       :value="passwordRecoveryForm.email"
                       @input="passwordRecoveryForm.email = $event"
                       label="E-mail" valid="name" type="text" placeholder="zororomz@gmail.com"/>
        <button
          @click="mainBlock = !mainBlock"
          class="btn warning big width-100 top-margin sign-up">Отправить пароль
        </button>
      </section>
      <section v-else>
        <h1 class="text-center">Авторизация</h1>
        <dw-input-text label="E-mail"
                       id="signInEmail"
                       :value="signInForm.login"
                       @input="signInForm.login = $event"
                       valid="login" type="text"
                       placeholder="zororomz@gmail.com"/>
        <dw-input-text label="Пароль"
                       id="signInPassword"
                       :value="signInForm.password"
                       @input="signInForm.password = $event"
                       valid="login" type="password"
                       placeholder="Введите пароль..."/>
        <dw-alert v-if="error" class="top-margin">Неправильный логин или пароль</dw-alert>
        <button
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
      <component @nextStep="nextBlock()" :sign-up-form="signUpForm" :is="signUpComponent"/>
    </div>
  </dw-modal>
</template>

<script>
  import DwInputText from "../inputs/DwInputText";
  import DwAlert from "../DwAlert";

  export default {
    props: {
      isSignIn: {
        required: true
      }
    },
    components: {
      DwInputText, DwAlert,
      DwModal: () => import("../DwModal")
    },
    data() {
      return {
        disabled: 0,
        error: true,
        signUpComponent: null,
        name: '',
        modalWidth: '416',
        mainBlock: true,
        forgotPassword: false,
        signUpForm: {
          login: '',
          email: '',
          password: '',
          name: '',
          surname: '',
          country: '',
          city: ''
        },
        signInForm: {
          login: '',
          password: ''
        },
        passwordRecoveryForm: {
          email: '',
        }
      }
    },
    async mounted() {
      this.signUpComponent = () => this.dynamicComponent();
      this.$parent.$on('openModal', this.open);
      this.name = (Math.random() + new Date().getTime()).toString();
    },
    computed: {

    },
    methods: {
      toggleSignIn() {
        return this.isSignIn = !this.isSignIn
      },
      dynamicComponent() {
        return this.mainBlock ? import(`~/components/header/signUp/Main.vue`)
          : import(`~/components/header/signUp/Additional.vue`);
      },
      open() {
        this.$emit('openModal');
      },
      nextBlock() {
        this.mainBlock = !this.mainBlock;
        this.signUpComponent = () => this.dynamicComponent()
      },
      goToSignUp() {
        // this.toggleSignIn();
        console.log('lel')
        // this.isSignIn = !this.isSignIn
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
