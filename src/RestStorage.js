import { reactive } from 'vue'
import qs from 'querystring'
import axios from 'axios'

export const getClient = () => {
  const handleError = e => {
    throw e
  }
  const client = axios.create({ baseURL: '/api/' })
  client.interceptors.response.use(r => r, handleError)
  return client
}

export const ReactiveRestApi = ({ client }) => {
  let stale_at = new Date().valueOf()
  const url_fetched_at = {}
  const pending = {}
  const state = reactive({
    loading: {},
    byUrl: {},
    byId: {},
  })

  const fetch = url => {
    const needs_fetch = stale_at > url_fetched_at[url] || !state.byUrl[url]
    if (state.loading[url]) {
      pending[url] = pending[url] || []
      let resolve
      const promise = new Promise(r => (resolve = r))
      pending[url].push(resolve)
      return promise
    } else if (needs_fetch && !state.loading[url]) {
      state.loading[url] = true
      return client.get(url).then(data => {
        url_fetched_at[url] = new Date().valueOf()
        state.byUrl[url] = data
        if (data.id) {
          state.byId[data.id] = data
        } else if (data.items) {
          data.items.forEach(item => (state.byId[item.id] = item))
        }
        state.loading[url] = false
        pending[url]?.forEach(resolve => resolve(data))
        return data
      })
    }
    return Promise.resolve(state.byUrl[url])
  }

  const get = url => {
    fetch(url)
    return state.byUrl[url]
  }

  const markStale = result => {
    stale_at = new Date().valueOf()
    return result
  }

  return {
    state,
    fetch,
    get,
    markStale,
    post: (url, data) => client.post(url, data).then(markStale),
    delete: url => client.delete(url).then(markStale),
  }
}

export default (slug, { api, client, collection_slug } = {}) => {
  collection_slug = collection_slug || `${slug}s`
  client = client || getClient()
  api = api || ReactiveRestApi({ client })

  return {
    api,
    getOne: id => {
      return api.state.byId[id] || api.get(`${slug}/${id}`)
    },
    getPage: ({ page, limit = 25 } = {}) => {
      const query = '?' + qs.stringify({ page, limit })
      return api.get(`${collection_slug}?${query}`)
    },
    save(data) {
      const url = data.id ? `${slug}/${data.id}` : slug
      return api.post(url, data)
    },
    delete: ({ id }) => api.delete(`${slug}/${id}`),
  }
}
