/* global describe:false it:false */
const assert = require('chai').assert
const { getHaystack, getRandBuffer, getRandStr, getRandInt } = require('./index.js')

describe('guld-random', function () {
  it('getHaystack 100', async function () {
    var str = await getHaystack(100, 'alphanumeric')
    assert.exists(str)
    assert.equal(str.length, 256)
  })
  it('getHaystack 254', async function () {
    var str = await getHaystack(254, 'alphanumeric')
    assert.exists(str)
    assert.equal(str.length, 256)
  })
  it('getHaystack 256', async function () {
    var str = await getHaystack(256, 'alphanumeric')
    assert.exists(str)
    assert.equal(str.length, 512)
  })
  it('getRandBuffer', async function () {
    var buff = await getRandBuffer(100)
    assert.exists(buff)
    assert.equal(buff.length, 100)
  })
  it('getRandStr', async function () {
    var str = await getRandStr(100)
    assert.exists(str)
    assert.equal(str.length, 100)
  })
  it('getRandStr 300', async function () {
    var str = await getRandStr(300)
    assert.exists(str)
    assert.equal(str.length, 300)
  })
  it('getRandInt', async function () {
    var num = await getRandInt(1)
    assert.exists(num)
    assert.isTrue(num <= 1)
  })
})
