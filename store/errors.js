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
    return mainValid[field.valid](field.value, field.minLength, field.maxLength)
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
  name(value, minLength, maxLength) {
    this.hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
    return this.hint;
  },
  password(value, minLength, maxLength) {
    this.hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
    return this.hint;
  },
  login(value, minLength, maxLength) {
    this.hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
    if (this.hint) return this.hint;
    this.hint = regHandler(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, value);
    this.hint = this.hint ? 'Только латиница и цифры' : '';
    return this.hint
  },
  email(value, minLength, maxLength) {
    this.hint = this.emptyField(value) || this.fillInMore(value, minLength) || this.fillLess(value, maxLength);
    if (this.hint) return this.hint;
    this.hint = regHandler(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , value);
    return this.hint
  },
  emptyField(value) {
    return value ? '' : 'Поле не должно быть пустым'
  },
  fillInMore(value, minLength) {
    if (!minLength) return;
    return value.length < minLength ? `Не менее ${ minLength } символов` : ''
  },
  fillLess(value, maxLength) {
    if (!maxLength) return;
    return value.length > maxLength ? `Не более ${ maxLength } символов` : ''
  }
};

const regHandler = (reg, value) => (reg.test(value) ? '' : 'Поле заполнено неверно');
