import { io } from "socket.io-client";
// let url='http://localhost:8080'
let url='https://fitlink-vbdq.onrender.com'

const socket = io(url,{
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
}); // connect to server

export default socket