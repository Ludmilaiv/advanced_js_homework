const FilterComp = Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="header__search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="header__search-field" v-model="userSearch">
                <button type="submit" class="header__link header__search">
                    <img src="./img/loupe.svg" alt="loupe">
                </button>
            </form>`
})

export default {
    FilterComp: FilterComp
}