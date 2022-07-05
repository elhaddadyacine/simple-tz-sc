const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/script.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    liveReload: true,
    hot: true,
    host: "localhost",
    port: 8080
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http")
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  experiments: {
    topLevelAwait: true
  }
};
