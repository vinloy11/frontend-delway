<template>
  <dw-modal :width="modalWidth" :name="isSignIn ? 'sign-in' : ''" class="modal">
    <div class="sign-in content" v-if="isSignIn">
      <section v-if="forgotPassword">
        <h2 class="text-center">{{ words.passwordRecovery }}</h2>
        <back-arrow @click.prevent="forgotPassword = !forgotPassword" class="link absolute bold back-arrow rotate"/>
        <dw-input-text id="email" :focus="true"
                       label="E-mail" valid="email" type="text" placeholder="zororomz@gmail.com"/>
        <button
          @click="mainBlock = !mainBlock"
          class="btn warning big width-100 top-margin sign-up">{{ words.sendPassword }}
        </button>
      </section>
      <section v-else>
        <h1 class="text-center">{{ words.logIn }}</h1>
        <dw-input-text label="E-mail"
                       id="email"
                       :focus="true"
                       valid="email" type="text"
                       placeholder="youremail@gmail.com"/>
        <dw-input-text :label="words.password"
                       id="signInPassword"
                       valid="password" type="password"
                       :placeholder="`${words.enterPassword}...`"/>
        <dw-alert v-if="error" class="top-margin">{{ words.incorrectLoginOrPassword }}</dw-alert>
        <button
          :disabled="isValid === 1"
          @click="signIn"
          class="btn big success width-100 top-margin">{{ words.signIn }}
        </button>
        <div class="width-100 text-center top-margin  semi-bold">
          <a @click.prevent="forgotPassword = !forgotPassword" href class="link">{{ words.forgotPassword }}</a></div>
        <button
          @click="goToSignUp"
          class="btn big  width-100 top-margin sign-up">{{ words.signUp }}
        </button>
      </section>
    </div>
    <div class="sign-up content " v-else>
      <h1 class="text-center">{{ words.registration }}</h1>
      <component @closeModal="close" @nextStep="nextBlock()" :is="mainBlock ? mainSignUp : Additional"/>
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
      words() {
        return this.$store.getters['translate/words']
      },
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
      },
      async signIn() {
        const history = this.$cookies.get('history')
        await this.$store.dispatch('authUser/login', {});
        if (history) {
          this.$router.push({ path: history.path });
          this.$cookies.remove('history')
        }
        this.close()

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
        border-bottom: 2px solid #ECEFF7;;
      }
    }
  }
</style>
