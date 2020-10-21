module.exports = {
  publicPath: "./",
  lintOnSave: false,
  devServer: {
    proxy: {
      "/base": {
        target: "http://xhcj.jsxhfh.com/base",
        changeOrigin: true,
        pathRewrite: {
          "/base": "",
        },
      },
    },
  },
};
