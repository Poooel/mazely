// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

const basePath = 'resources/app'

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    [`${basePath}/src`]: `/dist`,
    [`${basePath}/public/css`]: {
      url: `/assets`,
      static: true
    },
    [`${basePath}/public/img`]: {
      url: `/assets`,
      static: true
    },
    [`${basePath}`]: {
      url: `/`,
      static: true
    }
  },
  devOptions: {
    port: 3000,
    open: 'firefox developer edition'
  },
  buildOptions: {
    out: `${basePath}/build`,
    clean: true
  },
  proxy: {
    '/api': 'http://localhost:8080/api/'
  }
};
