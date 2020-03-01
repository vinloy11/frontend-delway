export const state = () => ({
  errors: [],
  ids: [],
  isValid: false,
  hints: {}
});

export const getters = {
  errors: state => state.errors,
  ids: state => state.ids,
  isValid: state => state.isValid,
  hint: () => field => {
    return mainValid[field.valid](field.value, field.minLength, field.maxLength, field.words)
  }
};

export const mutations = {
  addError: (state, error) => state.errors.unshift(error),
  popError: state => state.errors.pop(),
  addHint: (state, id) => {
    const match = state.ids.find(item => item === id);
    state.isValid = false ;
    return match ? '' : state.ids.push(id)
  },
  removeHint: (state, id) => {
    state.ids = state.ids.filter(item => item !== id);
    return state.ids.length ? state.isValid = false : state.isValid = true
  },
  removeHints: async state => {
    state.ids = [];
    state.hints = {};
  },
};

export const actions = {
  populateErrors: ({ commit }, error) => {
    // commit('addError', error);
    // setTimeout(() => commit('popError'), 3000);
  },
};

const mainValid = {
  hint: '',
  name(value, minLength, maxLength, words) {
    this.hint = this.emptyField(value, words) || this.fillInMore(value, minLength, words)
      || this.fillLess(value, maxLength, words);
    return this.hint;
  },
  password(value, minLength, maxLength, words) {
    this.hint = this.emptyField(value, words) || this.fillInMore(value, minLength, words) ||
      this.fillLess(value, maxLength, words);
    return this.hint;
  },
  login(value, minLength, maxLength, words) {
    this.hint = this.emptyField(value, words) || this.fillInMore(value, minLength, words)
      || this.fillLess(value, maxLength, words);
    if (this.hint) return this.hint;
    this.hint = regHandler(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, value, words);
    this.hint = this.hint ? words.onlyLatinAndNumber : '';
    return this.hint
  },
  email(value, minLength, maxLength, words) {
    this.hint = this.emptyField(value, words) || this.fillInMore(value, minLength, words)
      || this.fillLess(value, maxLength, words);
    if (this.hint) return this.hint;
    this.hint = regHandler(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , value, words);
    return this.hint
  },
  emptyField(value, words) {
    return value ? '' : words.emptyField
  },
  fillInMore(value, minLength, words) {
    if (!minLength) return;
    return value.length < minLength ? words.minChar + minLength : ''
  },
  fillLess(value, maxLength, words) {
    if (!maxLength) return;
    return value.length > maxLength ? words.maxChar + maxLength : ''
  }
};

const regHandler = (reg, value, words) => (reg.test(value) ? '' : words.invalidField);
