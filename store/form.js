export const state = () => ({
  fields: [],
  userInput: {
  },
  userPasswords: {

  }
});

export const getters = {
  fields: state => (state.fields),
  value: state => name => {
    return state.fields[name]
  },
  userInput: state => name => {
    return state.userInput[name]
  },
  userPassword: state => name => {
    return state.userPasswords[name]
  }
};

export const mutations = {
  updatedUserInput(state, field) {
    state.userInput[field.name] = field.value;
    localStorage.setItem('inputs', JSON.stringify(state.userInput));
  },
  updatedPasswordInput(state, field) {
    state.userPasswords[field.name] = field.value;
  },
  createField(state, name) {
    if (state.userInput[name]) return;
    state.userInput[name] = '';
  },
  createFieldPassword(state, name) {
    if (state.userPasswords[name]) return;
    state.userPasswords[name] = '';
  },
  getStorage(state) {
    const storageForm = JSON.parse(localStorage.getItem('inputs'));
    if (!storageForm) return;
    state.userInput = storageForm
  }
};

const isEmptyObject = (object) => (Object.entries(object).length === 0)
