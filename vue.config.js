// module.exports = {
//   chainWebpack: (config) => {
//     const svgRule = config.module.rule("svg");
//
//     svgRule.uses.clear();
//
//     svgRule
//       .use("babel-loader")
//       .loader("babel-loader")
//       .end()
//       .use("vue-svg-loader")
//       .loader("vue-svg-loader");
//   },
// };


module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('vue', '@vue/compat')

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

        config.module
            .rule('vue')
            .use('vue-loader')

            .tap(options => {
                return {
                    ...options,
                    compilerOptions: {
                        compatConfig: {
                            MODE: 2
                        }
                    }
                }
            })
    }
}