import { io } from "socket.io-client";

const socket = io("https://fitlink-vbdq.onrender.com",{
  transports: ["websocket"]
}); // connect to server


export default socket