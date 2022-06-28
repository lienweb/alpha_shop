import './scss/main.scss'
import "./template.html"
import * as header from './js/layout/header.js'
import { onclickUpdateCart, onClickUpdateForm } from './js/components/cart.js'
import swal from 'sweetalert';


'use strict'

const stepperPanel = document.querySelector(`.main__stepper-container`)
const formPanel = document.querySelector(`.main__form-control`)
const cartPanel = document.querySelector('.cart-list')
const btnPanel = document.querySelector('.main__btn-control')
const darkMode = document.querySelector('.nav__item-wrap .item-wrap__item:last-child')
let theme = JSON.parse(localStorage.getItem('theme')) || 'light'


formPanel.addEventListener('click', onClickUpdateForm)

cartPanel.addEventListener('click', onclickUpdateCart)

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
  } else if (e.target.matches('.submit')) {
    steppers[2].classList.add('checked')
    swal("下單成功!", "返回購物車首頁...", "success");
    nextStep = 1
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
    previous.classList.remove('d-none')
    previous.style.visibility = 'visible'
    btnSubmit.classList.remove('d-none')
  }
})

darkMode.addEventListener('click', header.onClickChangeTheme)

header.getTheme(theme)