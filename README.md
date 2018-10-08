# 一、编译ES6
## 1、babel-loader(babel-loader@8.0.0-beta.4)
## 2、babel-core(@babel/core)
## 3、babel-preset-env(@babel/preset-env):包含es2015、es2016、es2017、以及最近发布的规范
``` bash
    {
        "presets": [
            [
                "babel-preset-env",
                {
                    "modules": false,  // webpack4 JS Tree shaking 注：如生效，mode要设置为：production
                    "targets": {
                        "browsers": [
                            "> 1%",
                            "last 2 versions",
                            "not ie <= 8"
                        ]
                    }
                }
            ]
        ],
    }
```

# 二、提取公共代码
## 1、webpack3
``` bash
        /**
         * 打包公共代码
         * name(字符串：单个文件)、names(数组：多个文件)，指定chunks的名称
         * filename：公共代码打包以后的文件名
         * minChunks：数字(几次以上提取公共代码)、Infinity(不会把任何模块打包进去)
         * chunks：提取代码的范围，数组
         * async：异步动态加载时，如import('').then(()=>{})或者require.ensure打包公共代码，这里指定的异步公共代码的名字
         * **/
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['page_a', 'page_b']
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            async: 'async-common',
            children: true,
            minChunks: 2,
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        })
```

