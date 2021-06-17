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