class Product{
    constructor( name, price, description, images ){
        this.name = name
        this.price = price
        this.description = description
        this.images = images
    }
}

var name = 'Fall Limited Edition Sneakers'
var price = 125.00
var description = 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.'
var images = ['./images/image-product-1.jpg', './images/image-product-2.jpg',
              './images/image-product-3.jpg', './images/image-product-4.jpg']

var product1 = new Product(name, price, description, images)


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

    quantInCart.innerHTML = quantProducts.innerHTML
    quantInCart.classList.add('active')

    // TERMINAR DE EDITAR A ADIÇÃO DE UM PRODUTO NO CARRINHO 
})