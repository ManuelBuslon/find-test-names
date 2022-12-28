const { stripIndent } = require('common-tags')
const test = require('ava')
const { getTestNames } = require('../src')

test('test with a single string tag', (t) => {
  t.plan(1)
  const source = stripIndent`
    describe('foo', () => {
      it(['@one'], 'bar', () => {})
    })
  `
  const result = getTestNames(source)
  t.deepEqual(result, {
    suiteNames: ['foo'],
    testNames: ['bar'],
    tests: [
      {
        name: 'bar',
        tags: ['@one'],
        type: 'test',
        pending: false,
      },
      {
        name: 'foo',
        type: 'suite',
        pending: false,
      },
    ],
  })
})

test('test with tags', (t) => {
  t.plan(1)
  const source = stripIndent`
    describe('foo', () => {
      it(['@one'], 'bar', () => {})
    })
  `
  const result = getTestNames(source)
  t.deepEqual(result, {
    suiteNames: ['foo'],
    testNames: ['bar'],
    tests: [
      {
        name: 'bar',
        tags: ['@one'],
        type: 'test',
        pending: false,
      },
      {
        name: 'foo',
        type: 'suite',
        pending: false,
      },
    ],
  })
})

test('skipped test with tags', (t) => {
  t.plan(1)
  const source = stripIndent`
    describe('foo', () => {
      it.skip(['@one'], 'bar', () => {})
    })
  `
  const result = getTestNames(source)
  t.deepEqual(result, {
    suiteNames: ['foo'],
    testNames: ['bar'],
    tests: [
      {
        name: 'bar',
        tags: ['@one'],
        type: 'test',
        pending: true,
      },
      {
        name: 'foo',
        type: 'suite',
        pending: false,
      },
    ],
  })
})

test('describe with tags', (t) => {
  t.plan(1)
  const source = stripIndent`
    describe(['@one', '@two'], 'foo', () => {
      it('bar', () => {})
    })
  `
  const result = getTestNames(source)
  t.deepEqual(result, {
    suiteNames: ['foo'],
    testNames: ['bar'],
    tests: [
      {
        name: 'bar',
        type: 'test',
        pending: false,
      },
      {
        name: 'foo',
        tags: ['@one', '@two'],
        type: 'suite',
        pending: false,
      },
    ],
  })
})
