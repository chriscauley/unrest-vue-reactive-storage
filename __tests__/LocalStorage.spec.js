import LocalStorage from '../src/LocalStorage';

test('LocalStorage performs async right', async (done) => {
  const initial = {
    1: { id: 1, value: 'foo' }
  }
  const store = LocalStorage('testStorage', {initial})
  expect(store.getOne(1).value).toBe(initial[1].value)

  const promise1 = store.save({ id: 1, value: 'bar' })
  expect(store.getOne(1).value).toBe('foo')
  await promise1
  expect(store.getOne(1).value).toBe('bar')

  done()
})
