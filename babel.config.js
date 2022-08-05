const config = {
  presets: [["@babel/preset-env",{
    corejs: 3,
    useBuiltIns: 'usage'
  }],
  '@babel/preset-react'
],
  plugins: [],
};


if (process.env.NODE_ENV === "development") {
  config.plugins.push(['react-refresh/babel'])
}

module.exports = config;
