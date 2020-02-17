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
                       :value="signInFrom.login"
                       @input="signInFrom.login = $event"
                       valid="login" type="text"
                       placeholder="zororomz@gmail.com"/>
        <dw-input-text label="Пароль"
                       id="signInPassword"
                       :value="signInFrom.password"
                       @input="signInFrom.password = $event"
                       valid="login" type="password"
                       placeholder="Не менее 8 символов"/>
        <dw-alert v-if="error" class="top-margin">Неправильный логин или пароль</dw-alert>
        <button
          @click="error = !error"
          class="btn big success width-100 top-margin">Войти
        </button>
        <div class="width-100 text-center top-margin text-small semi-bold">
          <a @click.prevent="forgotPassword = !forgotPassword" href class="link">Забыли пароль?</a></div>
        <button
          @click="mainBlock = !mainBlock"
          class="btn big  width-100 top-margin sign-up">Зарегестрироваться
        </button>
      </section>
    </div>
    <div class="sign-up content " v-else>
      <h1 class="text-center">Регистрация</h1>
      <section v-if="mainBlock" class="main">
        <div class="title semi-bold top-margin-m bottom-padding-s">Аккаунт</div>
        <dw-input-text :value="signUpFrom.login"
                       id="signUpLogin"
                       @input="signUpFrom.login = $event"
                       label="Логин"
                       valid="login"
                       type="text"
                       placeholder="Leemiant"/>
        <dw-input-text label="E-mail"
                       id="signUpEmail"
                       :value="signUpFrom.email"
                       @input="signUpFrom.email = $event"
                       valid="login"
                       type="text"
                       placeholder="zororomz@gmail.com"/>
        <dw-input-text :value="signUpFrom.password"
                       id="signUpPassword"
                       @input="signUpFrom.password = $event"
                       label="Пароль" valid="login" type="password" placeholder="Не менее 8 символов"/>
        <dw-alert class="top-margin"/>
        <button
          v-if="$store.getters['errors/isValid']"
          @click="nextBlock"
          class="btn big success width-100 top-margin">Продолжить регистрацию
        </button>
      </section>
      <section v-else class="additional">
        <span class="text-small gray semi-bold inline-block width-100 text-center">Дополнительно</span>
        <div class="title semi-bold top-margin-m bottom-padding-s">Личные данные</div>
        <dw-input-text :value="signUpFrom.name"
                       id="signUpName"
                       @input="signUpFrom.name = $event"
                       label="Имя" valid="name" type="text" placeholder="Артемий"/>
        <dw-input-text :value="signUpFrom.surname"
                       id="signUpSurname"
                       @input="signUpFrom.surname = $event"
                       label="Фамилия" valid="name" type="text" placeholder="Лебедев"/>
        <div class="title semi-bold top-margin-m bottom-padding-s">Контакты</div>
        <dw-input-text :value="signUpFrom.country"
                       id="signUpCountry"
                       @input="signUpFrom.country = $event"
                       label="Страна" valid="name" type="text" placeholder="Россия"/>
        <dw-input-text :value="signUpFrom.city"
                       id="signUpCity"
                       @input="signUpFrom.city = $event"
                       label="Город" valid="name" type="text" placeholder="Красноярск"/>
        <button
          @click="nextBlock"
          class="btn big  width-100 top-margin">Зарегестрироваться
        </button>
      </section>
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
    mounted() {
      this.$parent.$on('openModal', this.open);
      this.name = (Math.random() + new Date().getTime()).toString();
    },
    methods: {
      nextBlock() {
        this.mainBlock = !this.mainBlock
      },
      open() {
        this.$emit('openModal');
      }
    },
    data() {
      return {
        error: true,
        name: '',
        modalWidth: '416',
        mainBlock: true,
        forgotPassword: false,
        signUpFrom: {
          login: '',
          email: '',
          password: '',
          name: '',
          surname: '',
          country: '',
          city: ''
        },
        signInFrom: {
          login: '',
          password: ''
        },
        passwordRecoveryForm: {
          email: '',
        }
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
