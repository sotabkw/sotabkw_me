import nextConfig from 'eslint-config-next'

const eslintConfig = [
  ...nextConfig,
  {
    settings: {
      next: {
        rootDir: '.',
      },
    },
  },
]

export default eslintConfig
