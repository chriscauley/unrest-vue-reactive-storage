import MemoryStorage from './MemoryStorage'
import _ls from 'local-storage-json'

export default (slug, { ls = _ls, ...options }) => {
  const LS_KEY = `LocalStorage:${slug}`
  options.inital = ls.get(LS_KEY) || options.initial
  options.afterSave = state => ls.set(LS_KEY, state)
  const store = MemoryStorage(slug, options)
  store.LS_KEY = LS_KEY
  return store
}
