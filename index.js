const pify = require('pify')
const readRandom = pify(require('read-random'))
const randomBytes = require('randombytes')
const { getJS, getOS } = require('guld-env')
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
CHARS.all = CHARS.lower + CHARS.upper + CHARS.number + CHARS.special
var jsenv
var osenv

async function getHaystack (length = 256, charset = 'alphanumeric') {
  var haystack = CHARS[charset]

  while (haystack <= 256 || haystack.length <= length || haystack.length % 256 !== 0) {
    haystack += CHARS[charset][await getRandInt(CHARS[charset].length - 1)]
  }
  return haystack
}

async function getRandBuffer (length = 256) {
  jsenv = jsenv || getJS()
  osenv = osenv || await getOS()
  if (jsenv.startsWith('node') && URAND_OS.indexOf(osenv.toLowerCase()) !== -1) return readRandom(length)
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

async function getRandInt (maximum = 1000000) {
  var buff = await getRandBuffer(Math.round(maximum / 256) + 1)
  var rint = 0
  for (var b of buff.values()) {
    rint += b
  }
  // TODO does this modulo operation make numbers earlier in range more likely?
  return rint % (maximum + 1)
}

module.exports = {
  getHaystack: getHaystack,
  getRandBuffer: getRandBuffer,
  getRandStr: getRandStr,
  getRandInt: getRandInt
}
