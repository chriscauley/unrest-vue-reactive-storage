import { reactive } from 'vue'
import qs from 'querystring'
import axios from 'axios'

export const getCSRF = (cookie = '') => {
  return cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
}

export const getClient = () => {
  const handleError = (e) => {
    throw e
  }
  const client = axios.create({
    baseURL: '/api/',
    transformRequest(data, headers) {
      const csrf = getCSRF(typeof document === 'undefined' ? '' : document.cookie)
      headers.delete['X-CSRFToken'] = csrf
      headers.post['X-CSRFToken'] = csrf
      headers.post['Content-Type'] = 'application/json'
      return JSON.stringify(data)
    },
  })
  client.interceptors.response.use((r) => r.data, handleError)
  return client
}

const noop = (a) => a

export const ReactiveRestApi = (options = {}) => {
  const { client = getClient(), fromServer = noop, toServer = noop } = options
  let stale_at = new Date().valueOf()
  const url_fetched_at = {}
  const pending = {}
  const state = reactive({
    loading: {},
    byUrl: {},
    byId: {},
  })

  const fetch = (url) => {
    const needs_fetch = stale_at > url_fetched_at[url] || !state.byUrl[url]
    if (state.loading[url]) {
      pending[url] = pending[url] || []
      let resolve
      const promise = new Promise((r) => (resolve = r))
      pending[url].push(resolve)
      return promise
    } else if (needs_fetch) {
      state.loading[url] = true
      return client.get(url).then((data) => {
        url_fetched_at[url] = new Date().valueOf()
        state.byUrl[url] = data
        if (data.id) {
          state.byId[data.id] = fromServer(data)
        } else if (data.items) {
          data.items.forEach((item) => (state.byId[item.id] = fromServer(item)))
        }
        state.loading[url] = false
        pending[url]?.forEach((resolve) => resolve(data))
        return data
      })
    }
    return Promise.resolve(state.byUrl[url])
  }

  const get = (url) => {
    fetch(url)
    return state.byUrl[url]
  }

  const markStale = (result) => {
    stale_at = new Date().valueOf()
    return result
  }

  return {
    state,
    fetch,
    get,
    markStale,
    post: (url, data) => client.post(url, toServer(data)).then(markStale),
    put: (url, data) => client.put(url, toServer(data)).then(markStale),
    delete: (url) => client.delete(url).then(markStale),
  }
}

export default (slug, options = {}) => {
  const { append_slash = true, fromServer, toServer } = options
  const SLASH = append_slash ? '/' : ''
  const collection_slug = options.collection_slug || `${slug}s`
  const client = options.client || getClient()
  const api = options.api || ReactiveRestApi({ client, fromServer, toServer })

  return {
    api,
    getOne: (id) => {
      return api.get(`${slug}/${id}${SLASH}`)
    },
    getPage: ({ page, limit = 25 } = {}) => {
      const query = qs.stringify({ page, limit })
      return api.get(`${collection_slug}${SLASH}?${query}`)
    },
    save(data) {
      const url = data.id ? `${slug}/${data.id}${SLASH}` : `${slug}${SLASH}`
      return api.post(url, data)
    },
    delete: ({ id }) => api.delete(`${slug}/${id}${SLASH}`),
  }
}
