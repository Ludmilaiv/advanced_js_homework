Vue.component('error', {
  props: ['error'],
  template: `<h1 v-show="error">Ошибка соединения!</h1>`
})