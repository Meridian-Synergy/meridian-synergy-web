import fr from './fr.json'
import en from './en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  messages: { fr, en },
}))
