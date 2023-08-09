/**
 * Google переводчик
 */

import Cookies from 'js-cookie'
import { debounce } from '@/utils'

const googleTranslateConfig = {
  // Оригинальный язык
  lang: 'ru',

  // Язык, на который переводим при первом посещении
  langFirstVisit: '', // en

  // domain: ''
}

// Подключаем виджет google translate
const script = document.createElement('script')
script.src = '//translate.google.com/translate_a/element.js?cb=widgetIsLoaded'
document.getElementsByTagName('head')[0].appendChild(script)

// Загрузка виджета Google Translate
// eslint-disable-next-line no-unused-vars
function widgetIsLoaded() {
  let interval = setInterval(() => {
    if (window.google?.translate?.TranslateElement) {
      clearInterval(interval)
      interval = null

      init(googleTranslateConfig)
    }
  }, 300)
}

// Инициализация
function init(config) {
  if (config.langFirstVisit && !Cookies.get('googtrans')) {
    // Если установлен язык перевода для первого посещения и куки не назначены
    cookieHandler(`/auto/${config.langFirstVisit}`)
  }

  const code = getCode(config)

  htmlHandler(code)

  if (code === config.lang) {
    // Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки
    cookieHandler(null, config.domain)
  }

  // Инициализируем виджет с языком по умолчанию
  // eslint-disable-next-line no-new
  new window.google.translate.TranslateElement({
    pageLanguage: config.lang,
    multilanguagePage: true, // страница содержит более одного языка
  })

  // Вешаем событие клик на флаги
  eventHandler('click', '[data-google-lang]', e => {
    cookieHandler(`/${config.lang}/${e.getAttribute('data-google-lang')}`, config.domain)

    // Перезагружаем страницу
    window.location.reload()
  })
}

function getCode(config) {
  // Если куки нет, то передаем дефолтный язык
  const isCookie = Cookies.get('googtrans') !== undefined && Cookies.get('googtrans') !== 'null'
  const lang = isCookie ? Cookies.get('googtrans') : config.lang

  return lang.match(/(?!^\/)[^/]*$/gm)[0]
}

function cookieHandler(val, domain) {
  // Записываем куки /язык_который_переводим/язык_на_который_переводим
  Cookies.set('googtrans', val, {
    domain: document.domain,
    path: '/',
    // sameSite: 'strict',
  })
  Cookies.set('googtrans', val, {
    domain: `.${document.domain}`,
    path: '/',
    // sameSite: 'strict',
  })

  if (domain === 'undefined') return
  // записываем куки для домена, если он назначен в конфиге
  Cookies.set('googtrans', val, {
    domain,
    path: '/',
    // sameSite: 'strict',
  })

  Cookies.set('googtrans', val, {
    domain: `.${domain}`,
    path: '/',
    // sameSite: 'strict',
  })
}

function eventHandler(event, selector, handler) {
  const onClick = e => {
    const el = e.target.closest(selector)
    if (el) handler(el)
  }

  document.addEventListener(event, debounce(onClick))
}

// Получаем язык на который переводим и производим необходимые манипуляции с DOM
function htmlHandler(code) {
  const activeToggles = document.querySelectorAll(`[data-google-lang="${code}"]`)
  const conf = {
    label: code === 'ru' ? 'Переключить язык сайта на английский' : 'Switch site language to Russian',
    title: code === 'ru' ? 'Английский' : 'Russian',
    code: code === 'ru' ? 'en' : 'ru',
  }

  if (activeToggles.length) {
    activeToggles.forEach(toggle => {
      const newToggle = toggle

      newToggle.classList.add('active')
      newToggle.ariaLabel = conf.label
      newToggle.title = conf.title
      newToggle.dataset.googleLang = conf.code
      newToggle.innerHTML = conf.code.toUpperCase()
    })
  }
}

export default widgetIsLoaded
