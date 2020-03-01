import {words}  from '~/assets/words.js'
export const state = () => ({
  translated: false,
  language: '',
  words: {...words},
});

export const getters = {
  words: state => (state.words),
  language: state => (state.language),
  translated: state => (state.translated)
};

export const mutations = {
  setLanguage(state) {
    state.language = this.$cookies.get('selectLang')
      || this.$cookies.get('language')
      || 'ru';
  },
  setWords(state, translatedWords) {
    if(translatedWords.words) {
      state.words = {...translatedWords.words}
      return
    }
    Object.keys(state.words).map((word, key) => {
      state.words[word] = translatedWords[key].translatedText
    })
  },
  toggleTranslated(state) {
    state.translated = state.translated ? 0 : 1
  }
};

export const actions = {
  fetchLanguage({commit, getters}) {
    if (getters['language']) return;
    commit('setLanguage')
  },
  async translatePage({commit, getters, dispatch}) {
    if (getters['translated']) return;
    await commit('setLanguage');
    let url = "https://translation.googleapis.com/language/translate/v2";
    const lang =  this.$cookies.get('selectLang')
      || this.$cookies.get('language');
    if (!lang) return;
    commit('toggleTranslated');
    if (lang === 'ru') {
      commit('setWords', {words});
      return
    }
    const apiKey = 'AIzaSyB6qb7Sm_vSJ2DBb6EXCO4MAnLFE3b-t1I';
    const newWords = {...words};
    let params = '';
    Object.keys(newWords).map((word, key) => {
      params += `&q=${newWords[word]}`;
    });
    url += `?target=${lang}&${params}&key=${apiKey}`;
    try {
      const { data } = await this.$axios.get(encodeURI(url))
      const translatedWords = data.data.translations;
      commit('setWords', translatedWords)
    } catch (e) {
      console.error(e)
    }
  }
};


