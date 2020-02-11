<template>
  <div>
    <input type="radio"
           :checked="shouldBeChecked"
           :value="value"
           @change="updateInput"
           :id="finalId"
    >
    <label :for="finalId">{{ label }}</label>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'modelValue',
      event: 'change'
    },
    props: {
      value: {
        type: String,
      },
      modelValue: {
        default: ""
      },
      label: {
        type: String,
        required: false
      },
      id: {
        required: false
      }
    },
    data: () => {
      return {
        finalId: null
      }
    },
    mounted() {
      return this.id ? this.finalId = this.id : this.finalId = Math.random();
    },
    computed: {
      shouldBeChecked() {
        return this.modelValue == this.value
      }
    },
    methods: {
      updateInput() {
        this.$emit('change', this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    input {
      display: none;
    }

    label {
      font-size: 0.9rem;
      cursor: pointer;
      color: var(--black);
      position: relative;
      padding-left: 28px;
      &:before {
        left: 0;
        width: 20px;
        height: 20px;
        content: '';
        position: absolute;
        background: url(~assets/svg/off.svg);
      }
    }
    input:checked + label:before {
      background: url(~assets/svg/on.svg);
    }
  }
</style>
