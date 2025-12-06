const yaml = require("yaml");
const fs = require("node:fs");

const loader = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8')
    try {
        module.exports = yaml.parse(content)
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}

require.extensions['.yaml'] = loader;
require.extensions['.yml'] = loader;