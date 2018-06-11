module.exports = {
proxyTable: {
        '/api': {    //将印射为/apis
            target: 'http://192.168.100.58',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   //需要rewrite的,
            }
        },
        '/apis': {    //印射为/apis
            target: 'http://192.168.100.58',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }
        }
	}
}
//http://qkw.com/cms/login