import './scss/main.scss'

'use strict'
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

const stepperPanel = document.querySelector(`.main__stepper-container`)
const formPanel = document.querySelector(`.main__form-control`)
const cartPanel = document.querySelector('.cart-list')
const total = document.querySelector('.cart__amount')
const btnPanel = document.querySelector('.main__btn-control')
const darkMode = document.querySelector('.nav__item-wrap .item-wrap__item:last-child')
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

  cart.forEach((item) => {
    sum += item.subtotal
  })
  sum += shippingFee
  total.innerHTML = `$${sum}`
  displayFee.innerHTML = (!fee ? '免費' : `$${fee}`)
}




formPanel.addEventListener('click', (e) => {
  if (!e.target.matches('[name="shipping-method"]')) return
  const shipping = e.target.parentElement.nextElementSibling.innerText

  shipping === '免費' ? fee = 0 : fee = parseInt(`${shipping.substring(1)}`)

  updateSum(cart, fee, sum)

  //UI
  document.querySelector('.shipping.checked').classList.toggle('checked')
  console.log(e.target.parentElement.parentElement);
  e.target.parentElement.parentElement.classList.toggle('checked')
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
  const steppers = document.querySelectorAll('.stepper__step-circle')
  const connectLines = document.querySelectorAll('.stepper__step-line')
  const stepLabels = document.querySelectorAll('.stepper__step-label')
  const formPages = document.querySelectorAll('.form__part')

  let step = parseInt(stepperPanel.dataset.step)
  let nextStep = 2

  function resetStyle() {
    //stepper
    steppers[0].classList.remove('checked')
    steppers[1].classList.remove('checked', 'active')
    steppers[2].classList.remove('checked', 'active')
    connectLines[1].classList.remove('active')
    stepLabels[1].classList.remove('active')
    stepLabels[2].classList.remove('active')
    //forms
    formPages[0].classList.add('d-none')
    formPages[1].classList.add('d-none')
    formPages[2].classList.add('d-none')
    //buttons
    previous.classList.add('d-none')
    previous.style.visibility = 'hidden'
    next.classList.add('d-none')
    btnSubmit.classList.add('d-none')
  }

  if (e.target.matches('.next')) {
    if (step === 1) {
      nextStep = 2
    } else if (step === 2) {
      nextStep = 3
    }
  } else if (e.target.matches('.previous')) {
    if (step === 2) {
      nextStep = 1
    } else if (step === 3) {
      nextStep = 2
    }
  }
  stepperPanel.dataset.step = nextStep

  if (nextStep === 1) {
    resetStyle()
    formPages[0].classList.remove('d-none')
    next.classList.remove('d-none')
  } else if (nextStep === 2) {
    resetStyle()
    steppers[0].classList.add('checked')
    steppers[1].classList.add('active')
    stepLabels[1].classList.add('active')
    formPages[1].classList.remove('d-none')
    previous.classList.remove('d-none')
    previous.style.visibility = 'visible'
    next.classList.remove('d-none')
  } else {
    resetStyle()
    steppers[0].classList.add('checked')
    steppers[1].classList.add('checked')
    steppers[2].classList.add('active')
    stepLabels[1].classList.add('active')
    stepLabels[2].classList.add('active')
    connectLines[1].classList.add('active')
    formPages[2].classList.remove('d-none')
    previous.style.visibility = 'visible'
    btnSubmit.classList.remove('d-none')
  }
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