# Unrest Vue Storage

This provides 3 vue storage systems with a consistent API.

* `store = RestStorage(key, options)` - state is held on a restuful API (at `/api/<key>,<id>` endpoints).

* `store = LocalStorage(key, options)` - persists state in local storage.

* `store = MemoryStorage(key, options)` - state is in ram only (non-peristent).

The goal of this project is to get around having to worry about async/await for getting objects in Vue components. So the pattern used is best understood first by looking at `RestStorage`

### `store = RestStorage(key, options)`

* `store.getOne(id)` - This will first return undefined, fetch `/api/<key>/<id>`, and then updates an internal reactive state (causing any vue component that uses the store to re-compute).

* `store.getPage({page, per_page})` - returns an pagination object like `{ items: [obj], per_page, page, pages, total }`. The exact format can be customized.

* `store.fetchOne(id)` and `store.fetchPage({...})` return promises that resolve to their equivalent "get" methods. These are useful when you need to use the store outside of a vue component. Multiple calls to either endpoint will only kick off a single request until `store.markStale()` is called.

* `store.markStale()` - makes the entire cache stale. This does not trigger a reflow, but the next time any of the above methods it will make another request. `getOne` and `getPage` calls will first return the stale cache and trigger another request.

* `store.save(data)` - Saves the object and returns a promise that resolves to the new object. For `RestStorage` this posts to `/api/<key>/<data.id>` or to `/api/<key>` if `data.id` is falsey.

* `store.delete(obj)` - removes object from the store and returns a promise. For `RestStorage` this.

### `LocalStorage` and `MemoryStorage`

* These two should be identical except that `LocalStorage` persists when the browser refreshes and `MemoryStorage` does not.

* `store.getOne` and `store.getPage` will return `undefined` when first called and then will cause a reflow in a separate thread. This is meant to emulate the asynchronous behavior of `RestStorage` so that an app can seamlessly use different storages in different environments (ie, it may be faster to develop using localStoage instead of a live API).

* All other methods are effectively the same because they directly expose promises.

* `options.prepareItem(data, getNextId)` can be set to emulate how the server may mutate an item. By default this sets `data.updated = new Date().valueOf()` for all objects and `data.id = getNextId()`, `data.created=data.updated` for new objects. `RestStorage` ignores this option.

## Development

To see changes while developing, use the demo. In order to develop you will need to delete the node_modules in the project root (advice on how to fix this would be greatly appreciated).

```
rm -rf node_modules
cd demo
yarn install
yarn serve
```

To update documentation (github pages), build the demo app and commit any changes in /docs.

## Build and Publish

```
yarn install
yarn lint
yarn build
yarn publish
```

## TODO

* I want to make this true about `store.save(data)`: `store.getOne(id)` will then return the object without triggering a request, but all `getPage` requests will be marked stale.