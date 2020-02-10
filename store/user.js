const user = {
  name: 'Андрей',
  lastName: 'Шторк',
  photo: '',
  email: 'zomoro@mail.ru',
  phone: '88005553535',
  country: 'Russia',
  city: 'Novosibirsk'
};

export const actions = {
  async fetchUser({}) {
    return await new Promise(resolve => {
        resolve(user)
    })
  },
}
