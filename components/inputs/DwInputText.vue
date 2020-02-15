<template>
  <label class="top-margin inline-block" :style="{width: width}">
    <div><span class="label text-small semi-bold gray">{{ label }}</span><span class="state success"/></div>
    <input v-dw-debounce:keyup="{wait: 100, func: validate, immediate: true }"
           :type="type"
           v-model="inputValue"
           :placeholder="placeholder">
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
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    methods: {
      validate() {
        mainValid[this.valid](this.inputValue)
      }
    }
  }
  const mainValid = {
    name(value) {

      console.log(value)
    },
    phone(value) {

    },
    email(value) {

    }
  }
</script>

<style lang="scss" scoped>
  label {
    .state {
      position: relative;
      &:before {
        top: 5px;
        content: '';
        position: absolute;
        height: 0.5rem;
        width: 0.7rem;
        right: -16px;
      }
      &.success:before {
        background-image: url(~assets/svg/form/success.svg);
      }
      &.error:before {
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
      &:hover {
        border-color: rgba(59, 104, 255, 0.5);
      }
      &:focus {
        border-color:  #3B68FF;
      }
      &::placeholder {
        color: var(--gray);
      }
    }
  }
</style>
