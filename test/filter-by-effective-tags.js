const {
  getTestNames,
  setEffectiveTags,
  filterByEffectiveTags,
} = require('../src')
const { stripIndent } = require('common-tags')
const test = require('ava')

const source = stripIndent`
describe(['@user'],'parent', () => {
  describe(['@auth'],'child', () => {
    it(['@one'],'works a', () => {})
      it('works b', () => {})
    })
  })
  describe(['@new'], 'outside', () => {
    it('works c', () => {})
  })
`

test('filters tests by effective tags', (t) => {
  t.plan(8)
  const result = getTestNames(source, true)
  t.deepEqual(result.testCount, 3)

  setEffectiveTags(result.structure)
  const testsOne = filterByEffectiveTags(result.structure, ['@one'])
  // finds a single test
  t.deepEqual(testsOne.length, 1)
  t.deepEqual(testsOne[0].name, 'works a')

  const testsNew = filterByEffectiveTags(result.structure, ['@new'])
  // finds a single test
  t.deepEqual(testsNew.length, 1)
  t.deepEqual(testsNew[0].name, 'works c')

  const testsAuth = filterByEffectiveTags(result.structure, ['@auth'])
  t.deepEqual(testsAuth.length, 2)
  t.deepEqual(testsAuth[0].name, 'works a')
  t.deepEqual(testsAuth[1].name, 'works b')
})

test('filters tests by effective tags from the source code', (t) => {
  t.plan(3)
  // call "filterByEffectiveTags" with the source code string and tags
  const filtered = filterByEffectiveTags(source, ['@user'])
  t.deepEqual(filtered.length, 2)
  t.deepEqual(filtered[0].name, 'works a')
  t.deepEqual(filtered[1].name, 'works b')
})
