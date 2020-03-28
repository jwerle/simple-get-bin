const debug = require('debug')('simple-get-cli')
const argv = require('minimist')(process.argv.slice(2))
const get = require('simple-get')

/**
 * A simple wrapper aroud the 'simple-get' module for
 * command line usage backed by 'minimist' to support
 * command line arguments like `--url`, and `--headers.user-agent=*`
 */
function main() {
  if (1 === argv._.length) {
    get(argv._[0], onget)
  } else {
    get(argv, onget)
  }

  function onget(err, res) {
    if (err) {
      debug(err.stack || err)
      process.nextTick(process.exit, 1)
      return
    }

    res.pipe(process.stdout)
  }
}

module.exports = main

if (!module.parent) {
  main()
}
