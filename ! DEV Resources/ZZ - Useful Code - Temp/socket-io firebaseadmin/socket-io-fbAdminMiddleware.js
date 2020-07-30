import { createServer } from 'http'
import createIoServer from 'socket.io'
import createIoClient from 'socket.io-client'

import createIoMiddlewareFirebaseAdmin from 'socket.io-middleware-firebase-admin'
import credential from './.credential'

const server = createServer()

const io = createIoServer(server)

const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credential)
})

const ioMiddleware = createIoMiddlewareFirebaseAdmin(app)

io.use(ioMiddleware)

server.listen(() => {
  const { port } = server.address()

  const client = createIoClient(`http://localhost:${port}`, {
    query: {
      session: '' // Await firebaseAdmin.auth().createSessionCookie(idToken)
    }
  })

  client.on('connect', error => {
    const decodedClaims = ioMiddleware.getCache(client.id)

    console.log(decodedClaims)
  })
})
