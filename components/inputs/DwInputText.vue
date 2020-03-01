<template>
  <label class="top-margin inline-block" :style="{width: width}">
    <div><span class="label  semi-bold gray">{{ label }}</span><span :class="['text-big','state', highlight ]"/></div>
    <span class="hint semi-bold gray text-small">{{ hint }}</span>
    <input
      :type="type"
      @blur="validate"
      ref="input"
      v-dw-debounce:keyup="{wait: 100, func: validate, immediate: true }"
      v-model="userInput"
      :placeholder="placeholder"
      :class="highlight"
    >
  </label>
</template>
<script>
  export default {
    props: {
      focus: {
        type: Boolean
      },
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String
      },
      placeholder: {
        type: String
      },
      type: {
        type: String
      },
      valid: {
        type: String
      },
      width: {
        default: '100%'
      },
      id: {
        type: String
      },
      minLength: {
        type: Number,
      },
      maxLength: {
        type: Number
      },
    },
    mounted() {
      this.focus ? (this.$refs.input.value ? '' : this.$refs.input.focus()) : '';
      this.validate(false);
      this.valid ? this.$store.commit('errors/addHint', this.id) : '';
    },
    beforeCreate() {
      if (this.$options.propsData.type === 'password') {
        this.$store.commit('form/createFieldPassword', this.$options.propsData.id);
        return
      }
      this.$store.commit('form/createField', {name: this.$options.propsData.id, value: this.$options.propsData.value})
    },
    computed: {
      userInput: {
        get() {
          if (this.type === 'password') {
            return this.$store.getters['form/userPassword'](this.id)
          }
          return this.$store.getters['form/userInput'](this.id)
        },
        set(value) {
          if (this.type === 'password') {
            this.$store.commit('form/updatedPasswordInput', { value: value, name: this.id })
            return
          }
          this.$store.commit('form/updatedUserInput', { value: value.split(' ').join(''), name: this.id })
        }
      }
    },
    data() {
      return {
        hint: '',
        highlight: '',
      }
    },
    methods: {
      async validate(highlight = true) {
        if (!this.valid) {
          this.highlight = '';
          return
        }
        let inputValue;
        if (this.type === 'password') {
          inputValue = await this.$store.getters['form/userPassword'](this.id)
        } else {
          inputValue = await this.$store.getters['form/userInput'](this.id);
        }
        const validateEnd = await this.$store.getters['errors/hint']({
          valid: this.valid,
          value: inputValue,
          minLength: this.minLength,
          maxLength: this.maxLength,
          words: this.$store.getters['translate/words']
        });
        if (!inputValue && !highlight) {
          validateEnd ? sendHint(this.$store, this.id, 'addHint')
            : sendHint(this.$store, this.id, 'removeHint');
          return
        }
        this.hint = validateEnd;
        if (this.hint) {
          sendHint(this.$store, this.id, 'addHint');
          this.highlight = 'error';
          return
        }
        sendHint(this.$store, this.id, 'removeHint');
        this.highlight = 'success';

      }
    },
    updated() {
      if (this.type === 'password') {
        this.$refs.input.value = this.$store.getters['form/userPassword'](this.id);
        return
      }
      this.$refs.input.value = this.$store.getters['form/userInput'](this.id);
    }
  }

  function sendHint(store, id, method) {
    return store.commit(`errors/${ method }`, id);
  }

</script>

<style lang="scss" scoped>
  label {
    position: relative;

    .hint {
      right: 0.5rem;
      margin-top: 0.7rem;
      position: absolute;
      z-index: 1;
    }

    .state {
      position: relative;

      &:before {
        top: 5px;
        content: '';
        position: absolute;
        height: 0.5rem;
        width: 0.7rem;
        right: -16px;
        background-repeat: no-repeat;
      }

      &.success:before {
        background-image: url(~assets/svg/form/success.svg);
      }

      &.error:before {
        height: 0.6rem;
        background-image: url(~assets/svg/form/error.svg);
      }
    }

    input {
      width: 100%;
      height: 38px;
      color: #3F4C67;
      padding: 1rem 1rem 0.5rem 0.5rem;
      outline: none;
      font-weight: 600;
      background-color: #F6F6F8;
      border: 1px solid transparent;
      box-sizing: border-box;

      &.error {
        background-color: #F7ECEC;
        border-bottom: 2px solid #F58888;

        &:hover {
          opacity: 0.8;
          border-color: #F58888;
        }

        &:focus {
          border-color: #F58888;
        }
      }

      &.success {
        background-color: #ECEFF7;
        border-bottom: 2px solid #3C64B1;

        &:hover {
          opacity: 0.8;
          border-color: #3C64B1;
        }

        &:focus {
          border-color: #3C64B1;
        }
      }

      &:hover {
        border-color: rgba(59, 104, 255, 0.5);
      }

      &:focus {
        border-color: #3B68FF;
      }

      &::placeholder {
        color: var(--gray);
      }
    }
  }
</style>
