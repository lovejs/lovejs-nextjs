const { Plugin } = require("@lovejs/framework");

class NextJsPlugin extends Plugin {
    async registerServices(container, origin) {
        await container.loadDefinitions(__dirname + "/_framework/services/services.yml", origin);
    }
}

module.exports = NextJsPlugin;
