import IServer from "@Interfaces/IServer";
import * as Express from "express";
import { Server as HTTPServer, createServer as HTTPCreateServer } from "http";

// Routes
import getBikeLoans from "./routes/getBikeLoans";

function createServer(): IServer {
    const app: Express.Express = Express();

    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.json());

    // Routes
    app.use("/bike_loans/", getBikeLoans());

    // Create HTTP Server.
    const http: HTTPServer = HTTPCreateServer(app);

    // Get the host and port.
    const host: string = process.env.API_HOST || "127.0.0.1";
    const port: number = Number(process.env.API_PORT) || 5000;

    http.listen(port, host, () => {
        console.log(`Server initialized on ${host}:${port}.`);
    });

    return { app, http };
}

export default createServer;
