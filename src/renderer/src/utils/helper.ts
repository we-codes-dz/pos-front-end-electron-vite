import {} from 'tailwindcss/lib/util/color'

import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

const cutText = (text: string, length: number) => {
  if (text.split(' ').length > 1) {
    const string = text.substring(0, length)
    const splitText = string.split(' ')
    splitText.pop()
    return splitText.join(' ') + '...'
  } else {
    return text
  }
}

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    return ''
  }
}

const onlyNumber = (string: string) => {
  if (string) {
    return string.replace(/\D/g, '')
  } else {
    return ''
  }
}

const formatCurrency = (number: number) => {
  if (number) {
    const formattedNumber = number.toString().replace(/\D/g, '')
    const rest = formattedNumber.length % 3
    let currency = formattedNumber.substr(0, rest)
    const thousand = formattedNumber.substr(rest).match(/\d{3}/g)
    let separator

    if (thousand) {
      separator = rest ? '.' : ''
      currency += separator + thousand.join('.')
    }

    return currency
  } else {
    return ''
  }
}

const isset = (obj: object | string) => {
  if (obj !== null && obj !== undefined) {
    if (typeof obj === 'object' || Array.isArray(obj)) {
      return Object.keys(obj).length
    } else {
      return obj.toString().length
    }
  }

  return false
}

const toRaw = (obj: object) => {
  return JSON.parse(JSON.stringify(obj))
}

const randomNumbers = (from: number, to: number, length: number) => {
  const numbers = [0]
  for (let i = 1; i < length; i++) {
    numbers.push(Math.ceil(Math.random() * (from - to) + to))
  }

  return numbers
}

const stringToHTML = (arg: string) => {
  const parser = new DOMParser(),
    DOM = parser.parseFromString(arg, 'text/html')
  return DOM.body.childNodes[0] as HTMLElement
}

const slideUp = (el: HTMLElement, duration = 300, callback = (el: HTMLElement) => {}) => {
  el.style.transitionProperty = 'height, margin, padding'
  el.style.transitionDuration = duration + 'ms'
  el.style.height = el.offsetHeight + 'px'
  el.offsetHeight
  el.style.overflow = 'hidden'
  el.style.height = '0'
  el.style.paddingTop = '0'
  el.style.paddingBottom = '0'
  el.style.marginTop = '0'
  el.style.marginBottom = '0'
  window.setTimeout(() => {
    el.style.display = 'none'
    el.style.removeProperty('height')
    el.style.removeProperty('padding-top')
    el.style.removeProperty('padding-bottom')
    el.style.removeProperty('margin-top')
    el.style.removeProperty('margin-bottom')
    el.style.removeProperty('overflow')
    el.style.removeProperty('transition-duration')
    el.style.removeProperty('transition-property')
    callback(el)
  }, duration)
}

const slideDown = (el: HTMLElement, duration = 300, callback = (el: HTMLElement) => {}) => {
  el.style.removeProperty('display')
  let display = window.getComputedStyle(el).display
  if (display === 'none') display = 'block'
  el.style.display = display
  let height = el.offsetHeight
  el.style.overflow = 'hidden'
  el.style.height = '0'
  el.style.paddingTop = '0'
  el.style.paddingBottom = '0'
  el.style.marginTop = '0'
  el.style.marginBottom = '0'
  el.offsetHeight
  el.style.transitionProperty = 'height, margin, padding'
  el.style.transitionDuration = duration + 'ms'
  el.style.height = height + 'px'
  el.style.removeProperty('padding-top')
  el.style.removeProperty('padding-bottom')
  el.style.removeProperty('margin-top')
  el.style.removeProperty('margin-bottom')
  window.setTimeout(() => {
    el.style.removeProperty('height')
    el.style.removeProperty('overflow')
    el.style.removeProperty('transition-duration')
    el.style.removeProperty('transition-property')
    callback(el)
  }, duration)
}

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'DZD',
  currencyDisplay: 'code'
})

//format date

const formatDateDetail = (value: string) => {
  let date = new Date(value)
  let createdAt = date.toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
  return createdAt
}
const formatDateOnly = (value: string) => {
  let date = new Date(value)
  let createdAt = date.toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
  return createdAt
}

export {
  cn,
  cutText,
  capitalizeFirstLetter,
  onlyNumber,
  formatCurrency,
  isset,
  toRaw,
  randomNumbers,
  stringToHTML,
  slideUp,
  slideDown,
  formatter,
  formatDateDetail,
  formatDateOnly
}
