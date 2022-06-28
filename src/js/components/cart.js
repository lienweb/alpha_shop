const cart = [
  {
    id: 1,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    qty: 1,
    stock: 10,
    image: "../src/images/cart_item1.png",
    subtotal: 3999,
  },
  {
    id: 2,
    name: '刷色直筒牛仔褲',
    price: 1299,
    qty: 1,
    stock: 10,
    image: "../src/images/cart_item2.png",
    subtotal: 1299,
  }
]
let fee = 0
let sum = 0

function displayCart() {
  let rawHTML = ``

  cart.forEach(item => {
    rawHTML += `<div class="cart-item mb-4 d-flex">
              <div class="cart-item__img">
                <img src="${item.image}" alt="cart-item">
              </div>
              <div class="cart-item__item-wrap d-flex">
                <div class="cart-item__item-name">${item.name}</div>
                <div class="cart-item__item-stock df-center-center">
                  <div class="cart-item__item-circle circle-minus mr-6">-</div>
                  <div class="cart-item__item-count">${item.qty}</div>
                  <div class="cart-item__item-circle circle-add ml-6">+</div>
                </div>
                <div class="cart-item__item-price">$${item.price}</div>
              </div>
            </div>`
  })
  cartPanel.innerHTML = rawHTML
}

function updateSum(cart, shippingFee, sum) {
  const displayFee = document.querySelector(`.cart__shipping-fee`)
  const total = document.querySelector('.cart__amount')

  cart.forEach((item) => {
    sum += item.subtotal
  })
  sum += shippingFee
  total.innerHTML = `$${sum}`
  displayFee.innerHTML = (!fee ? '免費' : `$${fee}`)
}

function onClickUpdateCart(e) {
  if (!e.target.matches('.cart-item__item-circle')) return
  const productName = e.target.parentElement.previousElementSibling.innerText
  const qtyElement = (e.target.matches('.circle-add') ? e.target.previousElementSibling : e.target.nextElementSibling)
  const action = (e.target.matches('.circle-add') ? 'add' : 'minus')
  sum = 0

  //product found
  const cartItem = cart.find(item => item.name === productName)

  if (typeof (cartItem)) {
    action === 'add' ? cartItem.qty++ : cartItem.qty--
    if (cartItem.qty < 1) cartItem.qty = 1
    if (cartItem.qty > cartItem.stock) cartItem.qty = cartItem.stock
    cartItem.subtotal = (cartItem.qty * cartItem.price)
    qtyElement.innerText = cartItem.qty

    //update sum
    updateSum(cart, fee, sum)
  }

  //update UI
  displayCart()
}

function onClickUpdateForm(e) {
  if (!e.target.matches('[name="shipping-method"]')) return
  const shipping = e.target.parentElement.nextElementSibling.innerText

  shipping === '免費' ? fee = 0 : fee = parseInt(`${shipping.substring(1)}`)
  updateSum(cart, fee, sum)

  //UI
  document.querySelector('.shipping.checked').classList.toggle('checked')
  e.target.parentElement.parentElement.classList.toggle('checked')
}


//multiple function export only support common JS, not ES6 (use ES6 named export install babel-loader)
module.exports = { onClickUpdateCart, onClickUpdateForm }