import { Express } from "express";
import { Server as HTTPServer } from "http";

interface IServer {
    app: Express;
    http: HTTPServer;
}

export default IServer;
