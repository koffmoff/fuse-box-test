import { fusebox, sparky } from 'fuse-box'
import { IPublicConfig } from 'fuse-box/config/IPublicConfig'

// Imported environment, with defaults
const env = {
  API_PROXY_TARGET: process.env.API_PROXY_TARGET || 'http://localhost:3333',
  DEV_SERVER_PORT: +process.env.DEV_SERVER_PORT || 4444
}

console.log(`Environment: %O`, env)

// Base configuration, common for all tasks
const baseConfig: IPublicConfig = {
  target: 'browser',
  entry: 'src/index.tsx',
  webIndex: {
    template: 'resources/index.html'
  },
  cache: {
    root: '.cache',
    enabled: true
  },
  logging: { level: 'succinct' },
  dependencies: {
    include: ['tslib']
  }
}

// Adds a dev server to the config
const withDevServer = (config: IPublicConfig) => ({
  ...config,
  watch: true,
  hmr: true,
  devServer: {
    httpServer: {
      port: env.DEV_SERVER_PORT,
    },
    proxy: [{
      // Proxy all api requests to the real server
      path: '/api',
      options: {
        target: env.API_PROXY_TARGET,
        changeOrigin: true,
      }
    }]
  }
})

class Context {
  config = baseConfig
}

const { task } = sparky<Context>(Context)

task('default', async ctx => {
  const config = withDevServer(ctx.config)
  config.env = { NODE_ENV: 'development' }
  fusebox(config).runDev(cb => { })
})

task('preview', async ctx => {
  const config = withDevServer(ctx.config)
  config.env = { NODE_ENV: 'production' }
  fusebox(config).runProd({ uglify: false })
})

task('dist', async ctx => {
  const config = ctx.config
  config.devServer = false
  config.env = { NODE_ENV: 'production' }
  fusebox(config).runProd({ uglify: false })
})