<template>
  <div class="grid">
    <div class="grid-row">
      <div data-column="4">
        <button class="btn"><span>Kek</span></button>
        <button class="btn default"><span>Kek</span></button>
        <button class="btn"><span>Kek</span></button>
        <button class="btn success"><span>Kek</span></button>
        <button class="btn warning"><span>Kek</span></button>
        <button class="btn danger"><span>Kek</span></button>
        <button class="btn danger disabled"><span>Kek</span></button>
      </div>
      <div data-column="4">
        <dw-checkbox v-for="checkbox of checkboxes"
                     :value="checkbox.name"
                     :key="checkbox.id"
                     :label="checkbox.name"
                     :model-value="checkboxes"
                     v-model="test"
        />
        {{ test }}
        <dw-checkbox :model-value="false"  v-model="testOne"/>
      </div>
      <div data-column="4">
        <dw-radio v-for="radio of checkboxes"
                  :key="radio.id"
                  :value="radio.name"
                  :label="radio.name"
                  :true-value="true"
                  :false-value="false"
                  v-model="modelRadio"
                  :model-value="checkboxes"
        />
              </div>
    </div>
    <div class="grid-row">
      <div data-column="12" style="display: flex">
        <dw-switch  v-model="switch1"/>
        <dw-switch  v-model="switch2"/>
        <dw-switch  v-model="switch1"/>
        <dw-switch  v-model="switch2"/>
        <dw-switch  v-model="switch1"/>
        <dw-switch  v-model="switch2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import DwSwitch from "../components/controls/DwSwitch";
  import DwCheckbox from "../components/controls/DwCheckbox";
  import DwRadio from "../components/controls/DwRadio";
  import TestSvg from '~/assets/svg/test.svg?inline';
  export default {
    components: { DwCheckbox, TestSvg, DwRadio, DwSwitch},
    data() {
      return {
        switch1: true,
        switch2: false,
        modelRadio: '',
        allCheck: false,
        test: ['kek'],
        testOne: false,
        checkboxes: [
          { name: 'Tom', age: 22, id: 2 },
          { name: 'Bob', age: 25, id: 3 },
          { name: 'Sam', age: 28, id: 4 },
          { name: 'Alice', age: 26, id: 5 }
        ]
      }
    },
    watch: {},
    computed: {}
  }
</script>

<style scoped>

</style>
