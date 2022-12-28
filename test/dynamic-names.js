const { stripIndent } = require('common-tags')
const test = require('ava')
const { getTestNames } = require('../src')

test('variable as test name', (t) => {
  t.plan(1)
  // instead of a string, this test's name is a variable
  const source = stripIndent`
    const name = 'works'
    it(name, () => {})
  `
  const result = getTestNames(source)
  // the result should have a test without a name
  t.deepEqual(result, {
    suiteNames: [],
    testNames: [],
    tests: [{ type: 'test', pending: false }],
  })
})

test('variable as test name then tags', (t) => {
  t.plan(1)
  // instead of a string, this test's name is a variable
  const source = stripIndent`
    const name = 'works @first @second'
    it(name, () => {})
  `
  const result = getTestNames(source)
  // console.dir(result, { depth: null })
  // the result should have a test without a name
  // and have the list of tags
  t.deepEqual(result, {
    suiteNames: [],
    testNames: [],
    tests: [{ type: 'test', pending: false }],
  })
})

test('concatenated strings', (t) => {
  t.plan(1)
  const source = stripIndent`
    it('super' + ' ' + 'test @first @second', () => {})
  `
  const result = getTestNames(source)
  // console.dir(result, { depth: null })
  // the result should have a test without a name
  // and have the list of tags
  t.deepEqual(result, {
    suiteNames: [],
    testNames: [],
    tests: [{ type: 'test', pending: false }],
  })
})

test('member expression', (t) => {
  t.plan(1)
  const source = stripIndent`
    const names = {
      first: 'my test @first @second',
    }
    it(names.first, () => {})
  `
  const result = getTestNames(source)
  // console.dir(result, { depth: null })
  // the result should have a test without a name
  // and have the list of tags
  t.deepEqual(result, {
    suiteNames: [],
    testNames: [],
    tests: [{ type: 'test', pending: false }],
  })
})
