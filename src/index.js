import './scss/main.scss'
// 運送方式擇一

'use strict'
//data source
const shopItems = [
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

const formPanel = document.querySelector(`.main__form-control`)
const cartPanel = document.querySelector('.cart-list')
const total = document.querySelector('.cart__amount')
const btnPanel = document.querySelector('.main__btn-control')
const darkMode = document.querySelector('.nav__item-wrap .item-wrap__item:last-child')
let step = 1
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
  cart.forEach((item) => {
    sum += item.subtotal
  })
  sum += shippingFee
  total.innerHTML = `$${sum}`
}

formPanel.addEventListener('click', (e) => {
  if (!e.target.matches('[name="shipping-method"]')) return
  const shipping = e.target.parentElement.nextElementSibling.innerText

  shipping === '免費' ? fee = 0 : fee = parseInt(`${shipping.substring(1)}`)

  updateSum(cart, fee, sum)
})

cartPanel.addEventListener('click', (e) => {
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
})

btnPanel.addEventListener('click', (e) => {
  if (!e.target.matches('.btn')) return
  const previous = document.querySelector(`.btn.previous`)
  const next = document.querySelector(`.btn.next`)
  const btnSubmit = document.querySelector(`.btn.submit`)

  //check current page
  let n = step
  //get next page index
  if (e.target.matches('.previous')) {
    document.querySelector(`.stepper__step:nth-child(${n - 1}) .stepper__step-circle`).classList.toggle('checked')
    document.querySelector(`.stepper__step:nth-child(${n}) .stepper__step-circle`).classList.toggle('active')
    document.querySelector(`.stepper__step:nth-child(${n}) .stepper__step-line`).classList.toggle('active')
    step--
    if (step < 1) step = 1
  } else {
    document.querySelector(`.stepper__step:nth-child(${n}) .stepper__step-circle`).classList.toggle('checked')
    document.querySelector(`.stepper__step:nth-child(${n + 1}) .stepper__step-circle`).classList.toggle('active')
    document.querySelector(`.stepper__step:nth-child(${n + 1}) .stepper__step-line`).classList.toggle('active')
    step++
    if (step > 3) step = 3
  }

  console.log(`next page[${step}]`);

  switch (step) {
    case 1:
      if (!previous.matches('.d-none')) {
        previous.classList.add('d-none')
      }
      if (next.matches('.d-none')) {
        next.classList.remove('d-none')
      }
      if (!btnSubmit.matches('.d-none')) {
        btnSubmit.classList.add('d-none')
      }
      break;
    case 2:
      if (previous.matches('.d-none')) {
        console.log('remove previous none at p2');
        previous.classList.remove('d-none')
      }
      if (next.matches('.d-none')) {
        next.classList.remove('d-none')
      }
      if (!btnSubmit.matches('.d-none')) {
        btnSubmit.classList.add('d-none')
      }
      break;
    case 3:
      if (previous.matches('.d-none')) {
        previous.classList.remove('d-none')
      }
      if (!next.matches('.d-none')) {
        next.classList.add('d-none')
      }
      if (btnSubmit.matches('.d-none')) {
        btnSubmit.classList.remove('d-none')
      }
      break;
    default:
      break;
  }
  document.querySelectorAll('.form__part').forEach(element => { element.classList.add('d-none') })
  document.querySelector(`.form__part:nth-child(${step})`).classList.toggle('d-none')
})

darkMode.addEventListener('click', (e) => {
  const darkModeIcon = "../src/images/dark_mode.svg"
  const lightModeIcon = "../src/images/bright_mode.svg"
  const iconImg = e.target

  if (document.body.dataset.dark === 'false') {
    document.body.setAttribute("data-dark", "true")
    iconImg.src = lightModeIcon
  } else {
    document.body.setAttribute("data-dark", "false")
    iconImg.src = darkModeIcon
  }
})

displayCart()