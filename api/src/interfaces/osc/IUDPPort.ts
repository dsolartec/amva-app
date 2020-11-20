import IOSCMessage from "./IOSCMessage";

interface IUDPPort {
    options: {
        localAddress: string;
        localPort: number;

        remoteAddress: string;
        remotePort: number;
    };

    close(): void;
    open(): void;
    on(type: "message", callback: (message: IOSCMessage) => void): void;
    send(message: IOSCMessage): void;
}

export default IUDPPort;
