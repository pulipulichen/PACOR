'use strict'

const { test } = use('Test/Suite')('User')

test('make sure 6 + 6 is 12', async ({ assert }) => {
  assert.equal(6 + 6, 12)
})
