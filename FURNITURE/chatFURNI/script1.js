document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector('.icon-cart');
    const closeCart = document.querySelector('.close');
    const body = document.querySelector('body');
    const productListHTML = document.querySelector('.list-product');
    const cartTab = document.querySelector('.cart-tab');
    const cartCount = document.querySelector('.cart-count');
    const cartListHTML = document.querySelector('.listcart');

    let products = [];
    let cart = [];

    // Toggle Cart Visibility
    cartIcon.addEventListener('click', () => {
        cartTab.classList.toggle('show');
    });

    closeCart.addEventListener('click', () => {
        cartTab.classList.remove('show');
    });

    // Add Products to DOM
    const addProductsToDOM = () => {
        productListHTML.innerHTML = '';
        products.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addcart" data-id="${product.id}">ADD TO CART</button>`;
            productListHTML.appendChild(item);
        });
    };

    // Add to Cart
    productListHTML.addEventListener('click', (event) => {
        if (event.target.classList.contains('addcart')) {
            const productId = event.target.dataset.id;
            const product = products.find(p => p.id == productId);
            cart.push(product);
            updateCart();
        }
    });

    // Update Cart
    const updateCart = () => {
        cartListHTML.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('item');
            cartItem.innerHTML = `
                <div>${item.name}</div>
                <div>$${item.price}</div>`;
            cartListHTML.appendChild(cartItem);
        });
        cartCount.textContent = cart.length;
    };
    
    cartIcon.addEventListener('click', () => {
        body.classList.toggle('showcart');
    });
    
    closeCart.addEventListener('click', () => {
        body.classList.remove('showcart');
    });

    // Initialize App
    const initApp = () => {
        fetch('Product.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                addProductsToDOM();
            })
            .catch(error => console.error('Error loading products:', error));
    };

    initApp();
});
