// Получить все элементы по селектору data в виде объекта
export const getElementsByData = name => {
  const el = {}

  document.querySelectorAll(`[data-${name}]`).forEach(toggle => {
    const key = toggle.dataset[name]

    el[key] = el[key] ? [toggle].concat(el[key]) : toggle
  })

  return el
}

// Ограничивает частоту выполнения определенной функции
export const debounce = (func, timeout = 300) => {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
