import hljs from 'highlight.js/lib/common'

import navigation from '@/components/navigation'
import darkMode from '@/components/dark-mode'
import translate from '@/components/google-translate'
import likely from 'ilyabirman-likely'
import codeBlock from '@/components/code-block'
import readProgress from '@/components/read-progress'
import backTop from '@/components/back-top'
import { Fancybox } from '@fancyapps/ui'

document.documentElement.classList.remove('no-js')
hljs.highlightAll()
navigation()
darkMode()
translate()
likely.initiate()
codeBlock()
readProgress()
backTop()

Fancybox.bind('[data-fancybox]', {
  buttons: ['zoom', 'fullScreen', 'close'],
})
