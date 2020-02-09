<template>
  <label>
    <input type="checkbox" :checked="shouldBeChecked" :value="value" @change="updateInput">
    <template v-if="shouldBeChecked">
      <dw-checked/>
    </template>
    <template v-else>
      <dw-unchecked/>
    </template>
    {{ label }}
  </label>
</template>
<script type="text/javascript">
  import DwChecked from '~/assets/svg/checked.svg?inline';
  import DwUnchecked from '~/assets/svg/unchecked.svg?inline';
  export default {
    components: {
      DwChecked, DwUnchecked
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
        default: false
      },
      label: {
        type: String,
        required: false
      },
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      }
    },
    computed: {
      shouldBeChecked() {
        if (this.modelValue instanceof Array
        ) {
          return this.modelValue.includes(this.value)
        }
        return this.modelValue === this.trueValue
      }
    },
    methods: {
      updateInput(event) {
        let isChecked = event.target.checked;

        if (this.modelValue instanceof Array) {
          let newValue = [...this.modelValue];

          if (isChecked) {
            newValue.push(this.value)
          } else {
            newValue.splice(newValue.indexOf(this.value), 1)
          }

          this.$emit('change', newValue)
        } else {
          this.$emit('change', isChecked ? this.trueValue : this.falseValue)
        }
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
