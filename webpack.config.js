const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    before(router){
      router.get('/success', (req,res) => {
        res.json('hahah')
      })
      router.post('/error', (req,res) => {
        res.sendStatus(500)
      })
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'head',
      scriptLoading: 'blocking'
    })
  ]
}