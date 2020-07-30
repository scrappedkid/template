
# firebase admin middleware usage:

> Command:

> ## createIoMiddlewareFirebaseAdmin(app, options = {}): middleware
>
```const server = createServer();
const io = createIoServer(server);
const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credential)
});
const ioMiddleware = createIoMiddlewareFirebaseAdmin(app);

io.use(ioMiddleware);

server.listen(() => {
  const { port } = server.address();
  const client = createIoClient(`http://localhost:${port}`, {
    query: {
      session: ""//await firebaseAdmin.auth().createSessionCookie(idToken)
    }
  });
  client.on("connect", error => {
    const decodedClaims = ioMiddleware.getCache(client.id);
    console.log(decodedClaims);
  });
});
```
> ## Firebase Socket IO Admin Session Cookie from that.


-----
-----
-----


# createIoMiddlewareFirebaseAdmin(app, options = {}): middleware
-----
## consts name shortening..
```
 const server = createServer();
 const io = createIoServer(server);
 const app = firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(credential)
 });
 const ioMiddleware = createIoMiddlewareFirebaseAdmin(app);
```
```
 io.use(ioMiddleware);
```
## creates auth client server
``` server.listen(() => {
   const { port } = server.address();
   const client = createIoClient(`http://localhost:${port}> `, {
     query: {
       session: ""//await firebaseAdmin.auth()> .createSessionCookie(idToken)
     }
   });
   client.on("connect", error => {
     const decodedClaims = ioMiddleware.getCache> (client.id);
     console.log(decodedClaims);
   });
 });
```

>  # ioMiddleware.getCache(clientId): decodedClaims
>       Returns the claim of the authenticated user.
>
```
  console.log(ioMiddleware.getCache(client.id));
  { iss:
  https://session.firebase.google.com/socketio-middleware-demo1',
  aud: 'socketio-middleware-demo1',
  auth_time: 1534417139,
  user_id: 'CUCPCuD50xgKeEfVggJ1fYQYNOj1',
  sub: 'CUCPCuD50xgKeEfVggJ1fYQYNOj1',
  iat: 1534417140,
  exp: 1534417440,
  email: 'i59naga@icloud.com',
  email_verified: false,
  firebase:
  { identities: { email: [Array] }, sign_in_provider: 'custom'
```
## options
>options.deny= true: boolean Deny connections of users who couldn't authenticate.

>options.cache= true: boolean Cache claim of authenticated user.

-----
-----
-----
