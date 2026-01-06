import { io } from "socket.io-client";
// let url='http://localhost:8080'
let url='https://fitlink-vbdq.onrender.com'

const socket = io(url,{
 transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,   // keep trying forever
  reconnectionDelay: 2000,           // 2 seconds
  reconnectionDelayMax: 5000,        // max delay
  timeout: 20000                     // connection timeout
}); // connect to server

export default socket;