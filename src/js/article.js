import hljs from 'highlight.js/lib/common' // оформление блока кода

import navigation from '@/components/navigation'
import darkMode from '@/components/dark-mode'
import translate from '@/components/google-translate'
import search from '@/components/search'
import likely from 'ilyabirman-likely'
import codeBlock from '@/components/code-block'

document.documentElement.classList.remove('no-js')
hljs.highlightAll()
navigation()
darkMode()
search()
translate()
likely.initiate()
codeBlock()
