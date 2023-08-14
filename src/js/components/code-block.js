/**
 * Копирование содержимого <code>
 */

import Clipboard from 'clipboard'

const codeBlock = () => {
  const clipboard = new Clipboard('.code-block__button', {
    target: trigger => trigger.parentElement.nextElementSibling,
  })

  clipboard.on('success', evt => {
    let { text } = evt

    if (text[0] === '$') {
      text = text.replaceAll('$ ', '')
    }

    navigator.clipboard.writeText(text)

    evt.clearSelection()
  })
}

export default codeBlock
