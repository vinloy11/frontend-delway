<template>
  <div class="filter-wrapper">
    <input type="checkbox" :id="id" v-model="internalValue" :value="value">
    <label :for="id">{{label}}</label>
  </div>
</template>

<script>
  export default {
    props: ['checked','value', 'label', 'id'],
    model: {
      prop: "checked"
    },
    computed:{
      internalValue: {
        get(){return this.checked},
        set(v){this.$emit("input", v)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter-wrapper {
    &.indeterminate {
      background-color: red;
    }
    cursor: pointer;
    input[type="checkbox"] {
      /*display: none;*/cursor: pointer;
    }

    input[type="checkbox"] + label {
      cursor: pointer;
    }

    input[type="checkbox"] + label:before {
      cursor: pointer;
    }

    input[type="checkbox"]:checked + label:before {

    }
  }
</style>
