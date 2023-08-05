// Получить все элементы по селектору data в виде объекта
export const getElementsByData = name => {
  const el = {}

  document.querySelectorAll(`[data-${name}]`).forEach(toggle => {
    const key = toggle.dataset[name]

    el[key] = el[key] ? [toggle].concat(el[key]) : toggle
  })

  return el
}

export const other = () => true
