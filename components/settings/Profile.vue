<template>
  <section class="profile">
    <div class="grid">
      <div class="grid-row">
        <div data-column="1"></div>
        <section data-column="10">
          <select v-model="selected">
            <option disabled value="">Язык</option>
            <option>en</option>
            <option>ru</option>
            <option>fr</option>
          </select>
          <span>{{ words.selected }}: {{ selected }}</span>
        </section>
        <div data-column="1"></div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selected: this.$store.getters['translate/language']
      }
    },
    computed: {
      words() {
        return this.$store.getters['translate/words']
      }
    },
    watch: {
      selected() {
        this.$cookies.set('selectLang', JSON.stringify(this.selected), {
          path: '/',
          maxAge: 60 * 60
        });
        this.$store.commit('translate/toggleTranslated');
        this.$store.dispatch('translate/translatePage');
      }
    },
  }
</script>

<style lang="scss" src="~/assets/style/settings/style.scss" scoped />
