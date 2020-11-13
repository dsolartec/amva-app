import Express from "express";
import http from "http";
import Cors from "cors";
import { Server } from "socket.io"
import osc from "osc";

const app = Express();

app.use(Cors({
    optionsSuccessStatus: 200,
}));

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const server = http.createServer(app);

const io = new Server(server);

const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 57121,

    remoteAddress: "127.0.0.1",
    remotePort: 57110,
    metadata: true,
});

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

server.listen(8081, () => {
    console.log("Listen on :8081");
});
