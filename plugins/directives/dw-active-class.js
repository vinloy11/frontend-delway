export default {
  bind: function (el) {
    el.addEventListener('keydown', (event) => toggleClass(event, el, true));
    el.addEventListener('keyup', (event) => toggleClass(event, el, false))
  },
}

function toggleClass(event, el, boolean) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  return boolean ? el.classList.add('active') : el.classList.remove('active')
}
