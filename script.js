
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


// Recebe as informações do carrinho no localStorage
onload = function cartInfo(){
    
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

    removeItens()
}

// Funcionalidade para abrir e fechar menu e carrinho no dispositivo móvel
menuMobile.addEventListener('click', () => {

    menu.classList.toggle('active')

})

btnClose.addEventListener('click', () => {

    menu.classList.toggle('active')

})


iconCart.addEventListener('click', () => {

    showAndHideCart.classList.toggle('active')
})

// Carrossel de imagens

var productImage = document.querySelectorAll('.selectedProductImage')
var count = 0

productImage.forEach( ( el ) => {

    el.src = product1.images[count]
    btnNext.addEventListener('click', () => {
        
        if(count < product1.images.length - 1){
            
            count += 1
            el.src = product1.images[count]
        }

    })

    btnPrevious.addEventListener('click', () => {

        if(count > 0){

            count -= 1
            el.src = product1.images[count]
        }
    })
})


// Adiciona ou subtrai a quantidade do mesmo produto

btnMinusProduct.addEventListener('click', () => {

    if(quantProducts.innerHTML > 1){

        quantProducts.innerHTML = Number(quantProducts.innerHTML) - 1
    }
})

btnPlusProduct.addEventListener('click', () => {
    
    quantProducts.innerHTML = Number(quantProducts.innerHTML) + 1
})


// Botão responsável em adicionar o produto ao carrinho

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


// botão responsável em remover item do carrinho

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