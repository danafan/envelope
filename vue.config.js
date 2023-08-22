module.exports = {	
	devServer: {
		proxy: {
			'/': {
				target: 'http://hb.loveismakeup.com',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}