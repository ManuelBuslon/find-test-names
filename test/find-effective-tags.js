const { findEffectiveTestTags, findEffectiveTestTagsIn } = require('../src')
const { stripIndent } = require('common-tags')
const { join } = require('path')
const test = require('ava')

test('finds effective test tags for each test', (t) => {
  t.plan(1)
  const source = stripIndent`
    describe(['@user'], 'parent', () => {
      describe(['@auth'], 'child', () => {
        it(['@one'], 'works a', () => {})
        it('works b', () => {})
      })
    })
    it(['@root'], 'sits at the top', () => {})
    it.skip('has no tags')
  `
  const result = findEffectiveTestTags(source)
  const expected = {
    'sits at the top': ['@root'],
    'parent child works a': ['@auth', '@one', '@user'],
    'parent child works b': ['@auth', '@user'],
    'has no tags': [],
  }
  t.deepEqual(result, expected)
})

test('finds effective test tags in a file', (t) => {
  t.plan(1)
  const specFilename = join(__dirname, '..', 'test-cy', 'spec-a.js')
  const result = findEffectiveTestTagsIn(specFilename)
  const expected = {
    'Suite A works 1': [],
    'Suite A works 2': ['A'],
  }
  t.deepEqual(result, expected)
})
