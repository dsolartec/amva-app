export type IOSCMessageData = {
    type: "s";
    value: string;
} | {
    type: "i" | "f" | "d";
    value: number;
};

interface IOSCMessage {
    address: string;
    args: IOSCMessageData[];
}

export default IOSCMessage;
