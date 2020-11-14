import IServer from "@Interfaces/IServer";
import * as Express from "express";
import { Server as HTTPServer, createServer as HTTPCreateServer } from "http";

function createServer(): IServer {
    const app: Express.Express = Express();

    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.json());

    const http: HTTPServer = HTTPCreateServer(app);

    const port: number = Number(process.env.API_PORT) || 5000;

    http.listen(port, () => {
        console.log(`Server initialized on :${port}.`);
    });

    return { app, http };
}

export default createServer;
