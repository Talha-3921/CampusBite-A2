import test from 'node:test'
import assert from 'node:assert/strict'
import { getQuantityWithinLimit } from '../src/utils/cartRules.js'

test('accepts a valid quantity below the limit', () => {
  assert.equal(getQuantityWithinLimit(3), true)
})

test('accepts exactly the maximum quantity', () => {
  assert.equal(getQuantityWithinLimit(8), true)
})

test('rejects a quantity over the limit', () => {
  assert.equal(getQuantityWithinLimit(9), false)
})
