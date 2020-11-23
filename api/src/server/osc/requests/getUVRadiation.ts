import IUVRadiationStation from "@Interfaces/IUVRadiationStation";
import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import * as uv_radiation from "@Utils/data/getUVRadiation";
import ICache from "@Interfaces/ICache";

function send_uv_radiation(osc: IUDPPort, data: IUVRadiationStation[], frequency: number) {
    console.log(`OSC: Got ${data.length} ultraviolet radiation stations.`);

    data.forEach((e, i) => {
        setTimeout(() => {
            const args: IOSCMessageData[] = [];

            args.push({ type: "f", value: e.ultraviolet_radiation });
            args.push({ type: "f", value: e.latitude });
            args.push({ type: "f", value: e.length });

            osc.send({ address: "/uv_radiation", args });
            console.log("OSC: Sent 1 ultraviolet radiation station.");
        }, i * frequency);
    });
}

export function getYesterday(message: IOSCMessage, osc: IUDPPort, cache: ICache): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested ultraviolet radiation stations of yesterday.");
    send_uv_radiation(osc, uv_radiation.getYesterday(cache.ultraviolet_radiation), frequency.value);
}

export function getToday(message: IOSCMessage, osc: IUDPPort, cache: ICache): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested ultraviolet radiation stations of today.");
    send_uv_radiation(osc, uv_radiation.getToday(cache.ultraviolet_radiation), frequency.value);
}
