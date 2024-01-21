import express from 'express'
import http from 'http'
// import superagent from 'superagent'

const dev: boolean = process.env.NODE_ENV !== 'production'
const hostname: string = '127.0.0.1'
const port: number = parseInt(process.env.PORT || '3000', 10)

const bootstrap = () => {
  const server = express()

  server.get('/', async (req, res) => {
    // const url: any = req?.query?.url
    const url = ''

    // const result = await superagent.get(url)
    // // return result.text
    // console.log(result.text)
    // res.send(result)

    http
      .get(url, (response) => {
        let data = ''
        response.on('data', (chunk) => {
          data += chunk
        })
        response.on('end', () => {
          res.send(data)
        })
      })
      .on('error', (err) => {
        console.error(err)
        res.status(500).send('Query failed...')
      })
  })

  server.listen(port, () => {
    console.warn(
      `🚀 Server ready at: http://${hostname}:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
}

bootstrap()
