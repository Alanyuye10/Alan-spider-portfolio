import { useEffect, useState } from 'react'

export function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const doneTyping = text === word
    const doneDeleting = text.length === 0
    const delay = doneTyping ? 1500 : doneDeleting && deleting ? 280 : deleting ? 45 : 85

    const timer = window.setTimeout(() => {
      if (doneTyping && !deleting) {
        setDeleting(true)
        return
      }
      if (doneDeleting && deleting) {
        setDeleting(false)
        setWordIndex((index) => (index + 1) % words.length)
        return
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, text, wordIndex, words])

  return text
}
