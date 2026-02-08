import app from './app.js'
const PORT = process.env.PORT
import {createServer} from 'http'
import {initSocket} from './socket/index.js'

const httpServer = createServer(app)
initSocket(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
