
var count = 0
var cart = []
var removeItem = []

class Product{
    constructor( name, price, description, images, thumbnails ){
        this.name = name
        this.price = price
        this.description = description
        this.images = images
        this.thumbnails = thumbnails
    }
}

var name = 'Fall Limited Edition Sneakers'
var price = 125.00
var description = 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.'
var images = ['./images/image-product-1.jpg', './images/image-product-2.jpg',
              './images/image-product-3.jpg', './images/image-product-4.jpg']

var thumbnails = ['./images/image-product-1-thumbnail.jpg', './images/image-product-2-thumbnail.jpg',
                  './images/image-product-3-thumbnail.jpg', './images/image-product-4-thumbnail.jpg']

var product1 = new Product(name, price, description, images, thumbnails)

var carouselProductImages = document.querySelectorAll('.carouselProductImages')
var productTitle = document.querySelector('.productTitle')
var productDescription = document.querySelector('.productDescription')
var productPrice = document.querySelector('#price')

// Get cart information from localStorage
onload = function cartInfo(){
    
    count = 0
    // Loading product info
    productTitle.innerHTML = product1.name
    productDescription.innerHTML = product1.description
    productPrice.innerHTML = '$' + product1.price
    // Loading product images
    product1.thumbnails.map( (thumb, index) => {

        if(index == 0){
            carouselProductImages.forEach( el => {

                el.innerHTML += `
                <div class="thumbImages selected">
                    <img src="${thumb}" alt="${thumb.substr(9)}">
                </div>`

            })
        }else {

            carouselProductImages.forEach( el => {

                el.innerHTML += `
                <div class="thumbImages">
                    <img src="${thumb}" alt="${thumb.substr(9)}">
                </div>`

            })
        }
    })
    
    if('cart' in localStorage){

        cart = JSON.parse(localStorage.getItem('cart'))
        
        if(cart == ''){

            cartContent.style.justifyContent = 'center'

            productContentInCart.innerHTML = '<div id="msgEmptyCart">Your cart is empty.</div>'
            
            btnCheckout.classList.add('withoutProduct')

            quantInCart.classList.remove('active')
        }else{

            productContentInCart.innerHTML = null

            btnCheckout.classList.remove('withoutProduct')

            cart.map( item => {
                
                productContentInCart.innerHTML += `<li>
                <img src="${item.thumbnails[0]}" alt="${item.thumbnails[0].substr(9)}">
                <div style="display: flex; flex-direction: column;">
                  <span>${item.name.substr(0, 23) + '...'}</span>
                  <span>$${item.price} x <span>${item.quantProducts}</span><strong>  $${item.price * item.quantProducts}</strong></span>
                </div>
                <img class="removeItem" src="./assets/icon-delete.svg" alt="icon-delete">
              </li>`
                
                quantInCart.classList.add('active')

                count += Number(item.quantProducts)
                
            })

            quantInCart.innerHTML = count

            count = 0
        }

    }else{

        localStorage.setItem('cart', JSON.stringify(cart))

        cartContent.style.justifyContent = 'center'

        btnCheckout.classList.add('withoutProduct')

        productContentInCart.innerHTML = '<div id="msgEmptyCart">Your cart is empty.</div>'

    }

    getThumbImages()
    removeItens()
}

// Functionality to open and close menu and cart on mobile device
menuMobile.addEventListener('click', () => {

    menu.classList.toggle('active')

})

btnClose.addEventListener('click', () => {

    menu.classList.toggle('active')

})


iconCart.addEventListener('click', () => {

    showAndHideCart.classList.toggle('active')
})

// image carousel mobile

var productImage = document.querySelectorAll('.selectedProductImage')

productImage[0].src = product1.images[count]

btnNext.addEventListener('click', () => {
    
    if(count < product1.images.length - 1){
        
        count += 1
        productImage[0].src = product1.images[count]
    }
})

btnPrevious.addEventListener('click', () => {
    
    if(count > 0){
        
        count -= 1
        productImage[0].src = product1.images[count]
    }
})


// Adds or subtracts the quantity of the same product

btnMinusProduct.addEventListener('click', () => {

    if(quantProducts.innerHTML > 1){

        quantProducts.innerHTML = Number(quantProducts.innerHTML) - 1
    }
})

btnPlusProduct.addEventListener('click', () => {
    
    quantProducts.innerHTML = Number(quantProducts.innerHTML) + 1
})


// Responsible button to add product to cart

btnAddToCart.addEventListener('click', () => {

    cart = JSON.parse(localStorage.getItem('cart'))

    cart.push({

        name: product1.name,
        price: product1.price,
        quantProducts: quantProducts.innerHTML,
        thumbnails: product1.thumbnails

    })

    localStorage.setItem('cart', JSON.stringify(cart))

    onload()
})


// Button responsible for removing item from cart

function removeItens(){

    var remove = document.querySelectorAll('.removeItem')

    remove.forEach( (item, index) => {

        item.addEventListener( 'click', el => {

            cart = JSON.parse(localStorage.getItem('cart'))

            el.path[1].remove()

            cart.splice(index, 1)

            localStorage.setItem('cart', JSON.stringify(cart))

            onload()
            
        })
    })

}


// Display image lightbox

var selectedProductImage = document.querySelectorAll('.selectedProductImage')
var lightBox = document.querySelector('.lightBox')
var body = document.querySelector('body')

function getThumbImages(){
    
    var allThumbImages = document.querySelectorAll('.thumbImages')
    var btnPreviousLightbox = document.querySelector('.btnPrevious')
    var btnNextLightbox = document.querySelector('.btnNext')
    
    allThumbImages.forEach( ( thumb, index ) => {
    
        thumb.addEventListener('click', () => {
    
            allThumbImages.forEach( thumb => {
    
                thumb.classList.remove('selected')
            })
    
            thumb.classList.add('selected')
    
            if(index < product1.images.length){
                
                productImage[0].src = product1.images[index]
                productImage[1].src = product1.images[index]
    
                count = index
    
                allThumbImages[count + product1.images.length].classList.add('selected')
            }else{
    
                productImage[0].src = product1.images[index - product1.images.length]
                productImage[1].src = product1.images[index - product1.images.length]
    
                count = index - product1.images.length
    
                allThumbImages[count].classList.add('selected')
            }
        })
    })

    btnPreviousLightbox.addEventListener('click', () => {

        if(count > 0){
    
            count -= 1
            productImage[1].src = product1.images[count]
            productImage[0].src = product1.images[count]
    
            allThumbImages[count + 1].classList.remove('selected')
            allThumbImages[count + product1.images.length + 1].classList.remove('selected')
    
            allThumbImages[count].classList.add('selected')
            allThumbImages[count + product1.images.length].classList.add('selected')
    
        }
    })

    btnNextLightbox.addEventListener('click', () => {

    if(count < product1.images.length - 1){
        
        count += 1
        productImage[1].src = product1.images[count]
        productImage[0].src = product1.images[count]

        allThumbImages[count - 1].classList.remove('selected')
        allThumbImages[count + product1.images.length - 1].classList.remove('selected')

        allThumbImages[count].classList.add('selected')
        allThumbImages[count + product1.images.length].classList.add('selected')

    }
})
    
}

selectedProductImage.forEach( img => {

    img.addEventListener('click', () => {

        productImage[1].src = img.src

        lightBox.classList.add('active')
        
        body.classList.add('overflowHidden')
    })
})

btnCloseLightbox.addEventListener('click', () => {

    lightBox.classList.remove('active')

    body.classList.remove('overflowHidden')
})
