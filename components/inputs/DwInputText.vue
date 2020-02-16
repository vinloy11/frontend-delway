<template>
  <label class="top-margin inline-block" :style="{width: width}">
    <div><span class="label text-small semi-bold gray">{{ label }}</span><span :class="['state', highlight ]"/></div>
    <span class="hint semi-bold gray">{{ hint }}</span>
    <input
      @blur="validate"
      v-dw-debounce:keyup="{wait: 100, func: validate, immediate: true }"
      :type="type"
      v-model="trimValue"
      :placeholder="placeholder"
      :class="highlight"
    >
  </label>
</template>

<script>
  export default {
    props: {
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
    },
    mounted() {
      this.$store.commit('errors/addHint', this.id);
    },
    computed: {
      trimValue: {
        set(v) {
          if (this.type === 'password') {
            this.inputValue = v;
            return
          }
          this.inputValue = v.split(' ').join('');
        },
        get() {
          if (this.type === 'password') {
            return this.inputValue
          }
          return this.inputValue.split(' ').join('')
        }
      }
    },
    data() {
      return {
        hint: '',
        highlight: '',
        inputValue: '',
        id: (Math.random() + new Date().getTime()).toString()
      }
    },
    methods: {
      validate() {
        // console.log(this.inputValue);
        const validateEnd = mainValid[this.valid](this.inputValue);
        this.hint = validateEnd.hint;
        if (this.hint) {
          this.$store.commit('errors/addHint', this.id);
          // this.$emit('validInput', this.valid)
          this.highlight = 'error';
          return
        }
        this.$store.commit('errors/removeHint', this.id);
        this.highlight = 'success'
      }
    }
  }
  let hint = '';
  const mainValid = {
    name(value) {

    },
    login(value) {
      let valid = regHandler(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, value)
      if (valid) {
        hint = ''
      } else if (value.length <= 1) {
        hint = 'Заполните поле более чем на 1 симовл'
      } else {
        hint = 'Только латиница и цифры'
      }
      return {
        hint
      }
    },
    email(value) {

    }
  };

  const regHandler = (reg, value) => (reg.test(value))
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
