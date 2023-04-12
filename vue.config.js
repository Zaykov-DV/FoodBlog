module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');
    svgRule
        .use('babel-loader')
        .loader('babel-loader')
        .end()
        .use('svg-vue3-loader')
        .loader('svg-vue3-loader');
  },
};