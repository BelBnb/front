/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackMockServer = require("webpack-mock-server");
const path = require("path");
const fs = require("fs");
const dev = require("./webpack.dev");
const assets = require("./webpack.common").assetsPath;

module.exports = (env, argv) => {
  const devConfig = dev(env, argv);
  const { proxy } = env;

  function remove(searchFunction) {
    devConfig.plugins.splice(devConfig.plugins.findIndex(searchFunction), 1);
  }
  // remove plugins because these aren't required for devServer
  remove((a) => a instanceof CopyWebpackPlugin);
  remove((a) => a instanceof MiniCssExtractPlugin);

  /** @type {import('webpack').Configuration} */
  const extendedConfig = {
    target: "web", // force target otherwise HMR doesn't work for style-loader
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
      https: {
        key: fs.readFileSync("./keys/cert.key"),
        cert: fs.readFileSync("./keys/cert.crt"),
        ca: fs.readFileSync("./keys/ca.crt"),
      },
      // proxy config will be remove if target is empty
      proxy: {
        // requires for ignoring CORS issues
        "/gateway": { target: proxy, changeOrigin: true, withCredentials: true, secure: false },
        "/socket.io": {
          target: "http://localhost:2999/",
          changeOrigin: true,
          withCredentials: false,
          secure: false,
          ws: true,
        },
      },
      hot: undefined === env.hot,
      liveReload: undefined === env.hot,
      historyApiFallback: {
        // provide index.html instead of 404:not found error (for SPA app)
        rewrites: [
          { from: /favicon.ico/, to: "public/favicon.ico" }, // provide favicon
        ],
      }, // it enables HTML5 mode: https://developer.mozilla.org/en-US/docs/Web/API/History
      devMiddleware: {
        stats: {
          children: false, // disable console.info for node_modules/*
          modules: false,
        },
      },
      onBeforeSetupMiddleware: (devServer) =>
        webpackMockServer.use(devServer.app, {
          entry: ["webpack.mock.ts"],
          tsConfigFileName: "tsconfig.json",
          before: (req, res, next) => {
            console.log(`Got request: ${req.method} ${req.url}`);
            // res.once("finish", () => {
            //   console.log(`Sent response: ${req.method} ${req.url}`);
            // });
            next();
          },
        }),
      static: {
        directory: path.resolve(__dirname, assets), // folder with static content
        watch: true, // enable hot-reload by changes in contentBase folder
      },
    },
  };

  if (proxy) {
    delete extendedConfig.devServer.onBeforeSetupMiddleware;
    console.log("<i> Proxy configured. webpack-mock-server is removed from config");
  } else {
    delete extendedConfig.devServer.proxy;
  }

  return merge(devConfig, extendedConfig);
};
