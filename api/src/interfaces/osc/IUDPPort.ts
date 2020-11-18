import IOSCMessage from "./IOSCMessage";

interface IUDPPort {
    close(): void;
    open(): void;
    on(type: "message", callback: (message: IOSCMessage) => void): void;
    send(message: IOSCMessage): void;
}

export default IUDPPort;
