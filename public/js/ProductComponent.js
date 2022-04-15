Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'img/no-photo.jpg'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            location.href = '#products';
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<ul class="products__list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img ? 'img/' + item.img : imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
            </ul>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <li class="products__item">
            <div class="products__item-img-wrp">
                <img class="products__item-img" :src="img" alt="fetured">
                <button class="products__item-button" type="button" @click="$emit('add-product', product)">
                    <img class="products__item-button-img" src="img/basket.svg" alt="cart">
                    <span>Add to Cart</span>
                </button>
            </div>
            <div class="products__item-wrp">
                <h3 class="products__item-title">{{product.product_name}}</h3>
                <p class="products__item-desk">{{product.product_desk}}</p>
                <p class="products__item-priсe">\${{product.price}}</p>
            </div>
        </li>
    `
})