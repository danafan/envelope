module.exports = {	
	devServer: {
		proxy: {
			'/': {
				target: 'http://hb.alinxn.com',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}