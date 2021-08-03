import { reactive } from 'vue'

const newThread = (f) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(f()), 0)
  })

const defaults = {
  makePaginator: ({ items, page, per_page }) => ({
    pages: Math.ceil(items.length / per_page),
    items: items.slice((page - 1) * per_page, page * per_page),
    total: items.length,
    page,
  }),
  prepareItem: ({ ...item }, getNextId) => {
    if (!item.id) {
      item.created = new Date().valueOf()
      item.id = getNextId()
    }
    item.updated = new Date().valueOf()
    return item
  },
}

export default (slug, options = {}) => {
  const {
    makePaginator = defaults.makePaginator,
    prepareItem = defaults.prepareItem,
    initial = {},
    afterSave = () => {},
    fromServer = (d) => d,
    toServer = (d) => d,
  } = options
  let ID_COUNTER = (Math.max(0, ...Object.keys(initial).map(Number)) || 0) + 1
  const state = reactive(initial)
  const getOne = (id) => fromServer(state[id])
  const getPage = ({ page = 1, per_page = 25 } = {}) =>
    makePaginator({
      items: Object.values(state).map(fromServer),
      per_page,
      page,
    })

  return {
    getOne,
    getPage,
    fetchOne: (id) => Promise.resolve(getOne(id)),
    fetchPage: (opts) => Promise.resolve(getPage(opts)),
    save: (data) =>
      newThread(() => {
        data = toServer(prepareItem(data, () => ID_COUNTER++))
        state[data.id] = data
        afterSave(state)
        return data
      }),
    delete: ({ id }) =>
      newThread(() => {
        delete state[id]
        afterSave(state)
      }),
  }
}
