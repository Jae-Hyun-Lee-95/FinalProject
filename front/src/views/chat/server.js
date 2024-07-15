import {io} from "socket.io-client";
const socket = io("http://192.168.0.55:5001");

export default socket;