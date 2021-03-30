import MemoryStorage from '../src/MemoryStorage';

test('MemoryStorage performs async right', async (done) => {
  const initial = {
    1: { id: 1, value: 'foo' }
  }
  const store = MemoryStorage('testStorage', {initial})
  expect(store.getOne(1).value).toBe(initial[1].value)

  const promise1 = store.save({ id: 1, value: 'bar' })
  expect(store.getOne(1).value).toBe('foo')
  await promise1
  expect(store.getOne(1).value).toBe('bar')

  const promise2 = store.save({ value: 'baz' })
  expect(store.getOne(2)).toBe(undefined)
  await promise2
  expect(store.getOne(2).value).toBe('baz')

  const fetched_one = await store.fetchOne(1)
  expect(fetched_one.value).toBe('bar')
  const fetched_page = await store.fetchPage()
  expect(fetched_page.items.length).toBe(2)
  done()
})

test('MemoryStorage.delete', async (done) => {
  const initial = {
    1: { id: 1, value: 'foo' }
  }
  const store = MemoryStorage('testStorage', {initial})

  const promise = store.delete({ id: 1})
  expect(store.getOne(1).value).toBe('foo')
  await promise
  expect(store.getOne(1)).toBe(undefined)

  done()
})

test('MemoryStorge without options', async (done) => {
  const store = MemoryStorage('testStorage')
  const promise1 = store.save({ value: 'bar' })
  await promise1
  expect(store.getOne(1).value).toBe('bar')
  done()
})