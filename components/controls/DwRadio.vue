<template>
  <label>
    <input type="radio" :checked="shouldBeChecked"
           :value="value"
           @change="updateInput">
    <template v-if="shouldBeChecked">
      <dw-on />
    </template>
    <template v-else>
      <dw-off />
    </template>
    {{ label }}
  </label>
</template>
<script>
  import DwOn from '~/assets/svg/on.svg?inline';
  import DwOff from '~/assets/svg/off.svg?inline';

  export default {
    components: {
      DwOff, DwOn
    },
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
  label {
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--black);
    input {
      display: none;
    }
    svg {
      vertical-align: bottom;
    }
  }
</style>
