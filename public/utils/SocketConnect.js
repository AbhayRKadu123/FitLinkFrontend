import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // connect to server


export default socket