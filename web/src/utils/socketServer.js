import { io } from "socket.io-client";

const socket = io("http://localhost:8081/", {
    transports: ["websocket"],
});

socket.on("connect", () => {
    socket.emit("coords", Math.random(), Math.random());
});
