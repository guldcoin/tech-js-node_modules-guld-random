# guld-random

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-random) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-random/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/lib/guld-random.html)

[![node package manager](https://img.shields.io/npm/v/guld-random.svg)](https://www.npmjs.com/package/guld-random) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-random.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-random?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-random.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-random/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-random/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-random) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-random/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-random?type=dev)

Cryptographically secure random number generator using `/dev/urandom` with fallback to node's `crypto` and finally to `window.crypto || window.mscrypto`.

### Install

##### Node

```sh
npm i guld-random
```

##### Browser

```sh
curl https///bitbucket.org/guld/tech-js-node_modules-guld-random/raw/guld/guld-random.min.js -o guld-random.min.js
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

### License

MIT Copyright isysd
