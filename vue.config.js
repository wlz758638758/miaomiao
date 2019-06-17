module.exports = {
    // 字段 devServer表示是开发文件的一个配置
    devServer: {
        // 反向代理的字段
        proxy: {
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }

}