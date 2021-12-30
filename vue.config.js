// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = {
	configureWebpack: {
		plugins: [
			new ChakraLoaderPlugin()
		]
	}
}
