// libs //

;(function() {
    var lazyLoadInstance = new LazyLoad({
        elements__selector: ".lazy"
      });
})();

// /libs //

// myLib.js
window.myLib = {};
window.myLib.body = document.querySelector('body');
window.myLib.closestAttr = (item, attr)=>{
    let node = item;

    while(node){
        let attrValue = node.getAttribute(attr);
        if(attrValue){
            return attrValue;
        }

        node = node.parentElement;
    }

    return null;
}

window.myLib.closestItemByClass = (item, className)=>{
    let node = item;

    while(node){
        if(node.classList.contains(className)){
            return node;
        }

        node = node.parentElement;
    }

    return null;
}

window.myLib.toggleScroll = ()=>{
    myLib.body.classList.toggle('no-scroll')
}


// /myLib.js

// header.j
;(function() {
    if(window.matchMedia('(max-width: 992px)').matches){
        return
    }

    let headerPage = document.querySelector('.header-page')

    window.addEventListener('scroll', function(){
        if(window.pageYOffset > 0){
            headerPage.classList.add('is-active');
        }else{
            headerPage.classList.remove('is-active');
        }
    })


})();
// /header.js

// scrollTo.js
;(function() {
    let scroll = (target)=>{
        let targetTop = target.getBoundingClientRect().top;
        let scrollTop = window.pageYOffset;
        let targetOffsetTop = targetTop + scrollTop;
        let headerOffset = document.querySelector('.header-page').clientHeight

        window.scrollTo(0, targetOffsetTop - headerOffset + 10)
    }

    myLib.body.addEventListener('click', (e)=>{
        let target = e.target;
        let scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');

        if(scrollToItemClass === null){
            return
        }

        e.preventDefault()
        let scrollToItem = document.querySelector('.' + scrollToItemClass)

        if(scrollToItem){
            scroll(scrollToItem);
        }
        
    })  
}) ();
// /scrollTo.js

// popup.js
;(function() {
    let showPopup = (target)=>{
        target.classList.add('is-active');
        myLib.toggleScroll();
    }

    let closePopup = (target)=>{
        target.classList.remove('is-active');
        myLib.toggleScroll();
    } 

    myLib.body.addEventListener('click', function(e) {
        let target = e.target;
        let popupClass = myLib.closestAttr(target, 'data-popup');

        if(popupClass === null){
            return
        }

        e.preventDefault();
        let popup = document.querySelector('.' + popupClass);

        if(popup){
            showPopup(popup);
            
        }
    })

    myLib.body.addEventListener('click', function(e) {
        let target = e.target;
        
        if(target.classList.contains('popup-close') || 
           target.classList.contains('popup__inner')){
               let popup = myLib.closestItemByClass(target, 'popup');
               closePopup(popup)
           }
    })

    myLib.body.addEventListener('keydown', function(e) {
        if(e.keyCode !== 27){
            return
        }
        
        let popup = document.querySelector('.popup.is-active')

        if(popup){
            closePopup(popup)
            myLib.toggleScroll()
        }
    })

    
})();
// /popup.js

// catalog.js
;(function() {
    let catalogSection = document.querySelector(".section-catalog");

    if (catalogSection === null){
        return;
    }
    
    let removeChildren = item => {
        while(item.firstChild){
            item.removeChild(item.firstChild);
        }
    }

    let updateChildren = (item, children) => {
        removeChildren(item)
        for(let i=0; i < children.length; i += 1){
            item.appendChild(children[i])
        }
    }

    let catalog = catalogSection.querySelector('.catalog');
    let catalogNav = catalogSection.querySelector('.catalog-nav')
    let catalogItems = catalogSection.querySelectorAll('.catalog__item')

    catalogNav.addEventListener('click', function(e){
        let target = e.target;
        let item = myLib.closestItemByClass(target, 'catalog-nav__btn')

        if(item === null || item.classList.contains('is-active')){
            return;
        }

        e.preventDefault()

        let filterValue = item.getAttribute('data-filter')
        let previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active')

        previousBtnActive.classList.remove('is-active')
        item.classList.add('is-active');

        if (filterValue === 'all'){
            updateChildren(catalog, catalogItems)
            return
        }

        let filteredItems = [];
        for(let i = 0; i < catalogItems.length; i += 1){
            let current = catalogItems[i];
            if (current.getAttribute('data-category') === filterValue){
                filteredItems.push(current)
            }
        }

        updateChildren(catalog, filteredItems);
    })

})();
// /catalog.js

// product.js
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
// /product.js

// map.js
;(function() {
    let sectionContacts = document.querySelector('.section-contacts');

    let YmapInit = () => {
        if(typeof(ymaps) == 'undefined'){
            return;
        }
    
        ymaps.ready(function () {
            var myMap = new ymaps.Map('ymap', {
                    center: [55.751574, 37.573856],
                    zoom: 10
                }, {
                    searchControlProvider: 'yandex#search'
                }),
        
                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    balloonContent: 'г. Москва, Преображенская площадь, 8'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: './img/common/marker.svg',
                    iconImageSize: [40, 63],
                    iconImageOffset: [-5, -38]
                });
        
            myMap.geoObjects
                .add(myPlacemark)
    
            myMap.behaviors.disable('scrollZoom')
        });
    }

    let YmapLoad = () => {
        let script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
        myLib.body.appendChild(script);
        script.onload = YmapInit;
    }

    let checkYmapInit = ()=>{
        let sectionContactsTop = sectionContacts.getBoundingClientRect().top;
        let scrollTop = window.pageYOffset;
        let sectionContactsOffsetTop = scrollTop + sectionContactsTop;

        if(scrollTop + window.innerHeight > sectionContactsOffsetTop){
            YmapLoad();
            window.removeEventListener('scroll', checkYmapInit)
        }
    }
    window.addEventListener('scroll', checkYmapInit)
    checkYmapInit();

})();
// /map.js