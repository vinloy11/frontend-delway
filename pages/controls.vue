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
      <div data-column="8">
        <!--        <dw-checkbox/>-->
        <dw-checkbox :class="allCheckedClass" :label="'all'" :id="'allCheck'" v-model="allCheckedValue"/>
        <dw-checkbox v-for="checkbox in checkboxes"
                     :key="checkbox.id"
                     :id="checkbox.id"
                     v-model="test"
                     :value="checkbox"
                     :label="checkbox.name"/>
        <dw-checkbox id="'kek'" :label="'Kek'" v-model="testOne"/>
        {{ testOne }} / {{ test }}
        <test-svg/>
        <img :src="externalSVG" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import DwCheckbox from "../components/controls/DwCheckbox";
  import TestSvg from '~/assets/svg/icons.svg';
  import ExternalSVG from '~/assets/svg/icons.svg';

  export default {
    components: { DwCheckbox, TestSvg},
    data() {
      return {
        allCheck: false,
        test: [],
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
    computed: {
      externalSVG() {
        return ExternalSVG;
      },
      allCheckedClass: {
        get() {
          return this.test.length === this.checkboxes.length ? 'all'
            : (this.test.length !== 0 ? 'indeterminate' : 'empty')
        },
      },
      allCheckedValue: {
        set() {
          if (!this.allCheckedValue) {
            this.test = [];
            this.checkboxes.forEach(checkbox => {
              this.test.push(checkbox)
            });
            return;
          }
          this.test = [];
        },
        get() {
          return this.test.length === this.checkboxes.length
            ? this.allCheck = true : this.allCheck = false
        },
      }
    }
  }
</script>

<style scoped>

</style>
