# guld-random

Cryptographically secure random number generator using `/dev/urandom` with fallback to node's `crypto` and finally to `window.crypto || window.mscrypto`.

### Install

```
npm i guld-random
```

### Usage

```
// get random buffer of length 100
var buff = await getRandBuffer(100)

// get random, alphanumeric (default) string of length 100
var str = await getRandStr(100)

// get random, alphanumeric + special string of length 100
var str = await getRandStr(100, 'all')

// get random number less than or equal to 100
var num = await getRandInt(100)
```

##### Node

```
const { getHaystack, getRandBuffer, getRandStr, getRandInt } = require('guld-random')
```
