let iconcart=document.querySelector('.icon-cart');
let closecart=document.querySelector('.close')
let body= document.querySelector('body');
let ListproductHTML = document.querySelector('.list-product');

let listCartHTML = document.querySelector('.listcart');
let cartCount = document.querySelector('.span1');

let products = [];
let cart = [];

let Listproducts = [];

iconcart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
closecart.addEventListener('click',()=>{
    body.classList.toggle('showcart')
})
const addDatatoHTML = ()=>{
    ListproductHTML.innerHTML = '';
    if(Listproducts.length>0){
        Listproducts.forEach(Product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${Product.image}" alt="">
            <h2>${Product.name}</h2>
            <div class="price">$${Product.price}</div>
            <button class="addcart">
                ADD TO CART
            </button>`;
            ListproductHTML.appendChild(newProduct);
        })
    }
}
ListproductHTML.addEventListener('click',(event)=>{
    // let positionclick = event.target;
    // if(positionclick.classList.contains('addcart')){
    //     alert('1');
    // }

    if (event.target.classList.contains('addcart')) {
        const productId = event.target.dataset.id;
        const product = products.find((p) => p.id == productId);
        cart.push(product);
        updateCart();
    }
})

// Update Cart
const updateCart = () => {
    listCartHTML.innerHTML = '';
    cart.forEach((item, index) => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <div class="image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="name">${item.name}</div>
            <div class="total-price">$${item.price}</div>
            <div class="quantity">
                <button class="minus" data-index="${index}">-</button>
                <span>1</span>
                <button class="plus" data-index="${index}">+</button>
            </div>`;
        listCartHTML.appendChild(cartItem);
    });
    cartCount.textContent = cart.length;
};



const initApp = ()=>{
    fetch('Product.json')
    .then(response=>response.json())
    .then(data=>{
        Listproducts = data
        console.log(Listproducts);
        addDatatoHTML();
        
    })
    .catch((error) => console.error('Error loading products:', error));
}
initApp();