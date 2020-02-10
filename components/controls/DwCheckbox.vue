<template>
  <div>
    <input type="checkbox" :id="finalId" :checked="shouldBeChecked" :value="value" @change="updateInput">
    <label :for="finalId">{{ label }}</label>
  </div>
</template>
<script type="text/javascript">
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
      },
      id: {
        required: false
      }
    },
    data: () => {
      return {
        finalId: null,
      }
    },
    mounted() {
      return this.id ? this.finalId = this.id : this.finalId = Math.random();
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
        background: url(~assets/svg/unchecked.svg);
      }
    }
    input:checked + label:before {
      background: url(~assets/svg/checked.svg);
    }
  }
</style>
