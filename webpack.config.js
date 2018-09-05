module.exports = [
  {
    mode: 'production',
    target: 'web',
    entry: {
      index: './index.js'
    },
    output: {
      filename: 'guld-random.min.js',
      path: __dirname,
      library: 'guldRandom',
      libraryTarget: 'var'
    }
  }
]
