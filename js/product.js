;(function() {
    let catalog = document.querySelector('.catalog')
    if(catalog === null){
        return;

    }

    let updateProductPrice = (product, price)=>{
        let productPrice = product.querySelector('.product__price-value');
        productPrice.textContent = price;
    }

    let changeProductSize = (target)=>{
        let product = myLib.closestItemByClass(target, 'product');
        let previousBtnActive = product.querySelector('.product__size.is-active')
        let newPrice = target.getAttribute('data-product-size-price');


        previousBtnActive.classList.remove('is-active')
        target.classList.add('is-active')

        updateProductPrice(product, newPrice);
    }

    let changeProductOrderInfo = target=>{
        let product = myLib.closestItemByClass(target, 'product');
        let order = document.querySelector('.popup-order')

        let productTitle = product.querySelector('.product__title').textContent
        let productSize = product.querySelector('.product__size.is-active').textContent
        let productPrice = product.querySelector('.product__price-value').textContent
        let productImgSrc = product.querySelector('.product__img').getAttribute('src')  
        
        order.querySelector('.order-info-title').setAttribute('value', productTitle);
        order.querySelector('.order-info-size').setAttribute('value', productSize);
        order.querySelector('.order-info-price').setAttribute('value', productPrice);

        order.querySelector('.order-product-title').textContent = productTitle;
        order.querySelector('.order-product-price').textContent = productPrice;
        order.querySelector('.order__size').textContent = productSize;
        order.querySelector('.order__img').setAttribute('src', productImgSrc);
    }

    catalog.addEventListener('click', function(e){
        let target = e.target;
        if(target.classList.contains('product__size') && !target.classList.contains('is-active')){
            e.preventDefault();
            changeProductSize(target)
        }

        if(target.classList.contains('product__btn')){
            e.preventDefault();
            changeProductOrderInfo(target)
        }
    })
})();