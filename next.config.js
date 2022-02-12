const withOptimizedImages = require('next-optimized-images')

module.exports = {
  // https://github.com/vercel/next.js/issues/21079
  // Remove this workaround whenever the issue is fixed
  images: {
    disableStaticImages: true,
  },
}

module.exports = withOptimizedImages({
  handleImages: ['jpeg', 'png', 'svg'],
})
