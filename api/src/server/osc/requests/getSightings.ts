import * as sightings from "@Utils/data/getSightings";
import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import ISighting from "@Interfaces/ISighting";
import sleep from "@Utils/sleep";

async function send_sightings(osc: IUDPPort, data: ISighting[], frequency: number) {
    console.log(`OSC: Got ${data.length} sightings.`);

    for (let i = 0; i <= ~~(data.length / 500); i++) {
        const init = i * 500;

        const args: IOSCMessageData[] = [];

        data.slice(init, init + 500).forEach((e) => {
            args.push({ type: "f", value: e.latitude });
            args.push({ type: "f", value: e.length });
        });

        osc.send({ address: "/sightings", args });
        console.log("OSC: Sent 500 sightings.");

        await sleep(frequency);
    }
}

export async function getSightingsToday(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of today.");
    await send_sightings(osc, await sightings.getSightingsToday(), frequency.value);
}

export async function getSightingsYesterday(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of yesterday.");
    await send_sightings(osc, await sightings.getSightingsYesterday(), frequency.value);
}

export async function getSightingsLastWeek(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested sightings of the last week.");
    await send_sightings(osc, await sightings.getSightingsLastWeek(), frequency.value);
}
