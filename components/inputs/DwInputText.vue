<template>
  <label class="top-margin inline-block" :style="{width: width}">
    <div><span class="label text-small semi-bold gray">{{ label }}</span><span :class="['state', highlight ]"/></div>
    <span class="hint semi-bold gray">{{ hint }}</span>
    <input
      @blur="validate"
      v-dw-debounce:keyup="{wait: 100, func: validate, immediate: true }"
      :type="type"
      v-bind:value="trimValue"
      v-on:input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :class="highlight"
    >
  </label>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
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
      }
    },
    mounted() {
      this.validate(false);
      this.valid ? this.$store.commit('errors/addHint', this.id) : '';
    },
    computed: {
      trimValue: {
        set(v) {
          if (this.type === 'password') {
            this.value = v;
            return
          }
          this.value = v.split(' ').join('');
        },
        get() {
          if (this.type === 'password') {
            return this.value
          }
          return this.value.split(' ').join('')
        }
      },
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
          console.log('kek')
          this.highlight = '';
          return
        }
        const validateEnd = await mainValid[this.valid](this.value, this.minLength, this.maxLength);
        if (!this.value && !highlight) {
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
    }
  }

  function sendHint(store, id, method) {
    return store.commit(`errors/${ method }`, id);
  }


  let hint = '';
  const mainValid = {
    name(value, minLength, maxLength) {
      hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
      return hint;
    },
    password(value, minLength, maxLength) {
      hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
      return hint;
    },
    login(value, minLength, maxLength) {
      hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
      if (hint) return hint;
      hint = regHandler(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, value);
      return hint
    },
    email(value, minLength, maxLength) {
      hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
      if (hint) return hint;
      hint = regHandler(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , value);
      return hint
    },
    emptyField(value) {
      return value ? '' : 'Поле не должно быть пустым'
    },
    fillInMore(value, minLength) {
      if (!minLength) return;
      return value.length < minLength ? `Не менее ${minLength} символов` : ''
    },
    fillLess(value, maxLength) {
      if (!maxLength) return;
      return value.length > maxLength ? `Не более ${maxLength} символов` : ''
    }
  };

  const regHandler = (reg, value) => (reg.test(value) ? '' : 'Поле заполнено неверно')
</script>

<style lang="scss" scoped>
  label {
    position: relative;

    .hint {
      right: 0.5rem;
      margin-top: 0.7rem;
      position: absolute;
      font-size: 12px;
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
