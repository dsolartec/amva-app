import * as sightings from "@Utils/data/getSightings";
import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import ISighting from "@Interfaces/ISighting";

function send_sightings(osc: IUDPPort, data: ISighting[], frequency: number) {
    console.log(`OSC: Got ${data.length} sightings.`);

    for (let i = 0; i <= ~~(data.length / 500); i++) {
        setTimeout(() => {
            const init = i * 500;

            const args: IOSCMessageData[] = [];

            data.slice(init, init + 500).forEach((e) => {
                args.push({ type: "f", value: e.latitude });
                args.push({ type: "f", value: e.length });
            });

            osc.send({ address: "/sightings", args });
            console.log("OSC: Sent 500 sightings.");
        }, i * frequency);
    }
}

export function getYesterday(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of yesterday.");
    sightings.getSightingsYesterday()
        .then((data) => send_sightings(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get sightings of yesterday: ${error}`));
}

export function getToday(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of today.");
    sightings.getSightingsToday()
        .then((data) => send_sightings(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get sightings of today: ${error}`));
}

export function getLastWeek(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of the last week.");
    sightings.getSightingsLastWeek()
        .then((data) => send_sightings(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get sightings of the last week: ${error}`));
}
