import IUDPPort from "@Interfaces/osc/IUDPPort";

function sendOSCError(message: string, osc: IUDPPort) {
    osc.send({
        address: "/error",
        args: [
            { type: "s", value: message },
        ],
    });

    console.log(`OSC Error: ${message}`);
}

export default sendOSCError;
