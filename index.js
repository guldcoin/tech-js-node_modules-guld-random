const pify = require('pify')
const readRandom = pify(require('read-random'))
const randomBytes = require('randombytes')
const guldEnv = require('guld-env')
const URAND_OS = [
  'linux',
  'x11',
  'ios',
  'android',
  'openbsd',
  'sunos',
  'mac_powerpc',
  'macintosh',
  'osx',
  'macos'
]
const CHARS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  special: `~!@#$%^&*()-_+={}[]<>\\|:;'",.?`
}
CHARS.alphanumeric = CHARS.lower + CHARS.upper + CHARS.number
CHARS.all = CHARS.alphanumeric + CHARS.special
const BYTESNEEDED = [
  256,
  65536,
  16777216,
  4294967296,
  1099511627776,
  281474976710656
]
var osenv

async function getHaystack (length = 256, charset = 'alphanumeric') {
  var haystack = CHARS[charset]

  while (haystack <= 256 || haystack.length <= length || haystack.length % 256 !== 0) {
    haystack += CHARS[charset][await getRandInt(CHARS[charset].length - 1)]
  }
  return haystack
}

async function getRandBuffer (length = 256) {
  osenv = osenv || (await guldEnv.os()).os
  if (guldEnv.JS.startsWith('node') && URAND_OS.indexOf(osenv.toLowerCase()) !== -1) return readRandom(length)
  return randomBytes(length)
}

async function getRandStr (length = 256, charset = 'alphanumeric') {
  var buff = await getRandBuffer(length)
  var rstr = ''
  var haystack = await getHaystack(length, charset)
  for (var b of buff.values()) {
    var i = b % haystack.length
    rstr += haystack[i]
  }
  return rstr
}

async function getRandInt (maximum = 255) {
  var bytes
  if (maximum < BYTESNEEDED[0]) bytes = 1
  else if (maximum < BYTESNEEDED[1]) bytes = 2
  else if (maximum < BYTESNEEDED[2]) bytes = 3
  else if (maximum < BYTESNEEDED[3]) bytes = 4
  else if (maximum < BYTESNEEDED[4]) bytes = 5
  else if (maximum < BYTESNEEDED[5]) bytes = 6
  else throw new RangeError(`maximum random number to generate is 281474976710656`)
  var buff = await getRandBuffer(bytes)
  var r = buff.readUIntBE(0, bytes)
  if (r <= maximum) return r
  else return getRandInt(maximum) // outside of range, try again and do not modulo
}

module.exports = {
  getHaystack: getHaystack,
  getRandBuffer: getRandBuffer,
  getRandStr: getRandStr,
  getRandInt: getRandInt
}
