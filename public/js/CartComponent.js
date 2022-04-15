// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'img/no-photo.jpg',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    })
            }
            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if (data.result === 1) {
            //             if(item.quantity>1){
            //                 item.quantity--;
            //             } else {
            //                 this.cartItems.splice(this.cartItems.indexOf(item), 1);
            //             }
            //         }
            //     })
        },
        getCount(){
            let count = 0;
            this.cartItems.forEach(item => {
                count += item.quantity;
            });
            return count;
        },
        getTotal(){
            let total = 0;
            this.cartItems.forEach(item => {
                total += item.price * item.quantity;
            });
            return total;
        }
    },
    template: `<div>
        <button class="header__link header__link-cart" type="button" @click="showCart = !showCart"><img src="./img/basket.svg" alt="cart">
            <span class="header__link-cart-count">{{ getCount() }}</span>
        </button>
        <section class="shopping-cart" v-show="showCart">
            <div class="shopping-cart__title-wrp">
                <h2 class="shopping-cart__title container">shopping cart</h2>
            </div>
            <div class="shopping-cart__wrp container">
                <form class="shopping-cart__form-sales" action="/">
                    <fieldset>
                        <legend class="visually-hidden">Sales</legend>
                        <ul class="shopping-cart__sales">
                            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img ? 'img/' + item.img : imgCart" :cart-item="item" @remove="remove"></cart-item>
                        </ul>
                        <div class="shopping-cart__buttons-wrp">
                        <button class="shopping-cart__button" type="submit">continue shopping</button>
                        </div>
                    </fieldset>
                </form>
                <div class="shopping-cart__form-wrp shopping-cart__form-wrp-flex">
                    <form class="shopping-cart__form-address" action="">
                        <fieldset>
                        <legend class="shopping-cart__form-address-title">shipping adress</legend>
                        <label for="city" class="visually-hidden">city</label>
                        <input type=text id="city" placeholder="City" value="Bangladesh">
                        <label for="state" class="visually-hidden">state</label>
                        <input type=text id="state" placeholder="State">
                        <label for="postcode" class="visually-hidden">postcode</label>
                        <input type=text id="postcode" placeholder="Postcode / Zip">
                        <button class="shopping-cart__form-address-btn" type="submit">get a quote</button>
                        </fieldset>
                    </form>
                    <div class="shopping-cart__checkout" action="/">
                        <div class="shopping-cart__form-checkout-row">
                        <span class="shopping-cart__sub-total">sub total</span>
                        <span class="shopping-cart__sub-total-price">{{ getCount() }}</span>
                        </div>
                        <div class="shopping-cart__form-checkout-row">
                        <span class="shopping-cart__total">sub total</span>
                        <span class="shopping-cart__total-price">{{ getTotal() }}</span>
                        </div>
                        <hr class="shopping-cart__checkout-hr">
                        <button class="shopping-cart__checkout-btn" type="button">proceed to checkout</button>
                    </div>
                </div>
            </div>
        </section>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `

    <li class="shopping-cart__sales-item">
        <img class="shopping-cart__sales-item-img" :src="img" alt="">
        <div class="shopping-cart__sale-info">
            <h3 class="shopping-cart__sale-title">{{ cartItem.product_name }}</h3>
            <ul class="shopping-cart__sale-info-list">
                <li class="shopping-cart__sale-info-item">Price: <span class="shopping-cart__sale-price">\${{ cartItem.price }}</span>
                </li>
                <li class="shopping-cart__sale-info-item">Color: Red</li>
                <li class="shopping-cart__sale-info-item">Size: Xl</li>
                <li class="shopping-cart__sale-info-item">Quantity: {{ cartItem.quantity }}
                </li>
            </ul>
            <button type="button" class="shopping-cart__del-btn" @click="$emit('remove', cartItem)">&times;</button>
        </div>
    </li>
    `
})