// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏幕的宽度、
      // 1. vant-ui中的组件就是按照375的视口宽度设计的
      // 2. 面经项目中设计稿按照375的视口宽度设计的，此时只需配置375
      // 3. 如果设计稿不是按照375而是按照750的宽度设计，那此时这个值该怎么填呢？px/2调成1倍图

      viewportWidth: 375
    }
  }
}
