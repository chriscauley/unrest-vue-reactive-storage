import debounce from 'lodash.debounce'
import { reactive } from 'vue'
import querystring from 'querystring'
import axios from 'axios'

export const getCSRF = (cookie = '') => {
  return cookie.match(/csrftoken=([^;]+)/)?.[1] || ''
}

export const getClient = ({ baseURL = '/api/' } = {}) => {
  const handleError = (e) => {
    throw e
  }
  const client = axios.create({
    baseURL,
    transformRequest(data, headers) {
      const csrf = getCSRF(typeof document === 'undefined' ? '' : document.cookie)
      headers.delete['X-CSRFToken'] = csrf
      headers.post['X-CSRFToken'] = csrf
      headers.post['Content-Type'] = 'application/json'
      headers.put['X-CSRFToken'] = csrf
      headers.put['Content-Type'] = 'application/json'
      return JSON.stringify(data)
    },
  })
  client.interceptors.response.use((r) => r.data, handleError)
  return client
}

const noop = (a) => a

export const ReactiveRestApi = (options = {}) => {
  const { client = getClient(), fromServer = noop, toServer = noop, live_api } = options
  const url_fetched_at = {}
  const pending = {}
  const state = reactive({
    loading: {},
    byUrl: {},
    byId: {},
    stale_at: new Date().valueOf(),
  })

  const commit = (item) => {
    state.byId[item.id] = {
      ...state.byId[item.id],
      ...fromServer(item),
    }
  }

  const lookup = (data) => {
    if (data.id) {
      return state.byId[data.id]
    } else if (data.items) {
      return data.items.map((item) => state.byId[item.id])
    }
    return data
  }

  const fetch = (url) => {
    const needs_fetch = state.stale_at > url_fetched_at[url] || !state.byUrl[url]
    if (state.loading[url]) {
      pending[url] = pending[url] || []
      const promise = new Promise((resolve, reject) => pending[url].push([resolve, reject]))
      return promise
    } else if (needs_fetch) {
      state.loading[url] = true
      return client
        .get(url)
        .then((data) => {
          url_fetched_at[url] = new Date().valueOf()
          state.byUrl[url] = data
          if (data.id) {
            commit(data)
          } else if (data.items) {
            data.items.forEach(commit)
          }
          state.loading[url] = false
          pending[url]?.forEach(([resolve]) => resolve(data))
          return lookup(data)
        })
        .catch((error) => {
          state.loading[url] = false
          state.byUrl[url] = { error }
          pending[url]?.forEach(([_, reject]) => reject(error))
          throw error
        })
    }
    return Promise.resolve(lookup(state.byUrl[url]))
  }

  const get = (url) => {
    fetch(url)
    return state.byUrl[url]
  }

  const markStale = (result) => {
    state.stale_at = new Date().valueOf()
    return result
  }

  return {
    state,
    fetch,
    get,
    markStale,
    post: (url, data) => client.post(url, toServer(data)).then(markStale),
    delete: (url, data = {}) => client.delete(url, { data }).then(markStale),
    put: async (url, data) => {
      const result = await client.put(url, toServer(data))
      if (live_api) {
        state.byUrl[url] = result
      } else {
        markStale()
      }
      return result
    },
    isLoading: (url) => state.loading[url],
  }
}

export default (slug, options = {}) => {
  const { append_slash = true, fromServer, toServer } = options
  const SLASH = append_slash ? '/' : ''
  const collection_slug = options.collection_slug || `${slug}s`
  const client = options.client || getClient()
  const api = options.api || ReactiveRestApi({ client, fromServer, toServer })

  const save = (data) => {
    if (data.id) {
      return api.put(`${slug}/${data.id}${SLASH}`, data)
    }
    return api.post(`${slug}${SLASH}`, data)
  }

  const _bouncers = {}
  const bounceSave = (data) => {
    if (!_bouncers[data.id]) {
      _bouncers[data.id] = debounce((data) => save(data), 1000)
    }
    _bouncers[data.id](data)
  }

  return {
    api,
    save,
    bounceSave,
    getOne: (id) => {
      return api.get(`${slug}/${id}${SLASH}`)
    },
    fetchOne: (id) => {
      return api.fetch(`${slug}/${id}${SLASH}`)
    },
    getPage: ({ page, limit = 25, query = {} } = {}) => {
      // TODO generalize fetch query string
      const qs = querystring.stringify({ page, limit, ...query })
      return api.get(`${collection_slug}${SLASH}?${qs}`)
    },
    fetchPage: ({ page, limit = 25, query = {} } = {}) => {
      const qs = querystring.stringify({ page, limit, ...query })
      return api.fetch(`${collection_slug}${SLASH}?${qs}`)
    },
    delete: ({ id }) => api.delete(`${slug}/${id}${SLASH}`),
    commit: (data) => api.commit(data),
  }
}
