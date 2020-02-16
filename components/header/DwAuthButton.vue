<template>
  <div>
    <button @click="authInit()" :class="['btn', isSignIn ? 'sign-in default' : 'sign-up']">
      <span v-html="isSignIn ? 'Войти' : 'Зарегестрироваться'"/>
    </button>
    <dw-modal :width="modalWidth" class="modal">
      <div  class="sign-in content" v-if="isSignIn">
        <section v-if="forgotPassword">
          <h2 class="text-center">Восстановление пароля</h2>
          <dw-input-text  label="E-mail"  valid="name" type="text" placeholder="zororomz@gmail.com"/>
          <button
            @click="mainBlock = !mainBlock"
            class="btn warning big width-100 top-margin sign-up">Отправить пароль</button>
        </section>
        <section v-else>
          <h1 class="text-center">Авторизация</h1>
          <dw-input-text  label="E-mail" valid="name" type="text" placeholder="zororomz@gmail.com"/>
          <dw-input-text label="Пароль"  valid="name" type="password" placeholder="Не менее 8 символов"/>
          <dw-alert v-if="error" class="top-margin">Неправильный логин или пароль</dw-alert>
          <button
            @click="error = !error"
            class="btn big success width-100 top-margin">Войти</button>
          <div class="width-100 text-center top-margin text-small semi-bold">
            <a @click.prevent="forgotPassword = !forgotPassword" href class="link">Забыли пароль?</a></div>
          <button
            @click="mainBlock = !mainBlock"
            class="btn big  width-100 top-margin sign-up">Зарегестрироваться</button>
        </section>
      </div>
      <div class="sign-up content " v-else>
        <h1 class="text-center">Регистрация</h1>
        <section v-if="mainBlock" class="main">
          <div class="title semi-bold top-margin-m bottom-padding-s">Аккаунт</div>
          <dw-input-text label="Логин"  valid="login" type="text" placeholder="Leemiant"/>
          <dw-input-text label="E-mail"  valid="login" type="text" placeholder="zororomz@gmail.com"/>
          <dw-input-text label="Пароль"  valid="login" type="password" placeholder="Не менее 8 символов"/>
          <dw-alert class="top-margin"/>
          <button
            v-if="$store.getters['errors/isValid']"
            @click="mainBlock = !mainBlock"
            class="btn big success width-100 top-margin">Продолжить регистрацию</button>
        </section>
        <section v-else class="additional">
          <span class="text-small gray semi-bold inline-block width-100 text-center">Дополнительно</span>
          <div class="title semi-bold top-margin-m bottom-padding-s">Личные данные</div>
          <dw-input-text label="Имя"  valid="name" type="text" placeholder="Артемий"/>
          <dw-input-text label="Фамилия"  valid="name" type="text" placeholder="Лебедев"/>
          <div class="title semi-bold top-margin-m bottom-padding-s">Контакты</div>
          <dw-input-text label="Страна"  valid="name" type="text" placeholder="Россия"/>
          <dw-input-text label="Город"  valid="name" type="text" placeholder="Красноярск"/>
          <button
            @click="mainBlock = !mainBlock"
            class="btn big  width-100 top-margin">Зарегестрироваться</button>
        </section>
      </div>
    </dw-modal>
  </div>
</template>

<script>
  import DwModal from "../DwModal";
  import DwInputText from "../inputs/DwInputText";
  import DwAlert from "../DwAlert";
  export default {
    components: { DwModal, DwInputText, DwAlert },
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
        error: true,
        name: '',
        modalWidth: '416',
        mainBlock: true,
        forgotPassword: false
      }
    },
    watch: {
      forgotPassword() {
        this.forgotPassword ? this.modalWidth = '496' : this.modalWidth = '416'
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
