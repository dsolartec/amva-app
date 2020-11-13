import Express from "express";
import http from "http";
import { Server } from "socket.io"
import osc from "osc";

// Create the Express server.
const app = Express();

// Create the HTTP server using the Express server.
const server = http.createServer(app);

// Create the SocketIO server using the HTTP server.
const io = new Server(server);

// Create the UDP connection for SuperCollider.
const udpPort = new osc.UDPPort({
    remoteAddress: "127.0.0.1",
    remotePort: 57110,
    metadata: true,
});

// Initialize the UDP connection.
udpPort.open();

io.on("connection", (socket) => {
    socket.on("coords", (lat, long) => {
        const msg = {
            address: "/hello/from/oscjs",
            args: [
                {
                    type: "f",
                    value: lat,
                },
                {
                    type: "f",
                    value: long,
                },
            ],
        };

        console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);

        udpPort.send(msg);
    });
});

// Initialize the HTTP server.
server.listen(8081, () => {
    console.log("Listen on :8081");
});
