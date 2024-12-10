let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close')
let body = document.querySelector('body');
let ListproductHTML = document.querySelector('.list-product');
let listCartHTML = document.querySelector('.listcart');
let iconCartSpan = document.querySelector('.listcart span')

let listproducts = [];
let carts = [];

iconCart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
closeCart.addEventListener('click',()=>{
    body.classList.toggle('showcart') 
})

const addDatatoHTML = ()=>{
    ListproductHTML.innerHTML = '';
    if(listproducts.length>0){
        listproducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addcart">
                    ADD TO CART
                </button>`;
            ListproductHTML.appendChild(newProduct);    
        })
    }
}

ListproductHTML.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addcart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id)=>{
    let positionThisProductInCart = carts.findIndex((value)=>value.product_id == product_id)
    if(carts.length <=0){
        carts = [{
            product_id:product_id,
            quantity:1
        }]
    }
    else if(positionThisProductInCart <0){
        carts.push({
            product_id:product_id,
            quantity:1
        })
    }
    else{
        carts[positionThisProductInCart].quantity =carts[positionThisProductInCart].quantity+1; 
    }
    console.log(carts);
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = ()=>{
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addCartToHTML = ()=>{
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length >0){
        carts.forEach(cart=>{
            totalQuantity =totalQuantity+cart.quantity;
            let newcart = document.createElement('div');
            newcart.classList.add('item');
            let positionProduct = listproducts.findIndex((value)=>value.id == cart.product_id);
            let info = listproducts[positionProduct];
            newcart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="total-price">
                    $${info.price +cart.quantity}
                 </div>
                <div class="quantity">
                    <span class="minus"></span>
                    <span>${cart.quantity}</span>
                    <span class="plus"></span>
                </div>`;
             listCartHTML.appendChild(newcart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

const initApp = ()=>{
   fetch('product.json')
   .then(response=>response.json())
   .then(data=>{
     listproducts = data; 
    // console.log(listproducts);
     addDatatoHTML();

    //   if(localStorage.getItem('cart')){
    //     carts = localStorage.getItem('cart');
    //     addCartToHTML();
    //   }
    
   })
}
initApp();