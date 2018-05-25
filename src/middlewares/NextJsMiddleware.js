const _ = require("lodash");

const { Middleware } = require("@lovejs/components/middlewares");

class NextJsMiddleware extends Middleware {
    getOptionsSchema() {
        return {
            oneOf: [
                {
                    type: "object",
                    properties: {
                        dir: { type: "string" },
                        dev: { type: "boolean" },
                        prefix: { type: "string" }
                    },
                    required: ["dir"]
                }
            ]
        };
    }

    async getMiddleware({ dir, prefix, dev }) {
        const { app, handler } = require(dir)({ dev, dir });

        if (prefix) {
            app.setAssetPrefix(prefix);
        }

        await app.prepare();

        return async context => {
            await handler(context.req, context.res);
            context.respond = false;
        };
    }
}

module.exports = NextJsMiddleware;
