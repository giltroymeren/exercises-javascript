const WEB_SOCKET_SERVER_PORT = 8000
const webSocketServer = require('websocket').server 
const http = require('http')

const SERVER = http.createServer()
SERVER.listen(WEB_SOCKET_SERVER_PORT)
console.log(`Listening on port ${WEB_SOCKET_SERVER_PORT}`)

const WEB_SOCKET_SERVER = new webSocketServer({
	httpServer: SERVER 
})

const CLIENTS = {}

const getUniqueID = () => {
	const code = () => Math.floor((1 + Math.random()) * 0x10000)
		.toString(16).substring(1)
	return code() + code() + '-' + code()
}

WEB_SOCKET_SERVER.on('request', function(request) {
	var userID = getUniqueID()
	console.log(`${new Date()}: received a new connection from origin
		${request.origin}`)

	const connection = request.accept(null, request.origin)
	CLIENTS[userID] = connection
	console.log(`Connected: ${userID} in ${Object.getOwnPropertyNames(CLIENTS)}`)

	connection.on('message', function(message) {
		if(message.type === 'utf8') {
			console.log(`Received message: ${message.utf8Data}`)

			for(key in CLIENTS) {
				CLIENTS[key].sendUTF(message.utf8Data)
				console.log(`Sent message to: ${CLIENTS[key]}`)
			}
		}
	})
})