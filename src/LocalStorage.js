import { reactive } from 'vue'
import MemoryStorage from './MemoryStorage'
import _ls from 'local-storage-json'

export const ReactiveLocalStorage = (options = {}) => {
  if (typeof options === 'string') {
    options = { LS_KEY: options }
  }
  const { LS_KEY, initial = {}, ls = _ls } = options
  const state = reactive(ls.get(LS_KEY) || initial)
  const save = (data) => {
    Object.assign(state, data)
    ls.set(LS_KEY, state)
  }
  return { state, save }
}

export default (slug, { ls = _ls, ...options } = {}) => {
  const LS_KEY = `LocalStorage:${slug}`
  options.initial = ls.get(LS_KEY) || options.initial
  options.afterSave = (state) => ls.set(LS_KEY, state)
  const store = MemoryStorage(slug, options)
  store.LS_KEY = LS_KEY
  return store
}
