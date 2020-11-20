import * as bike_loans from "@Utils/data/getBikeLoans";
import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import IBikeLoan from "@Interfaces/IBikeLoan";
import sleep from "@Utils/sleep";

async function send_bike_loans(osc: IUDPPort, data: IBikeLoan[], frequency: number) {
    console.log(`OSC: Got ${data.length} bike loans.`);

    for (let i = 0; i <= ~~(data.length / 500); i++) {
        const init = i * 500;

        const args: IOSCMessageData[] = [];

        data.slice(init, init + 500).forEach((e) => {
            args.push({ type: "f", value: e.loan_data.latitude });
            args.push({ type: "f", value: e.loan_data.length });
            args.push({ type: "f", value: e.return_data.latitude });
            args.push({ type: "f", value: e.return_data.length });
        });

        osc.send({ address: "/bike_loans", args });
        console.log("OSC: Sent 500 bike loans.");

        await sleep(frequency);
    }
}

export async function getBikeLoansToday(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of today.");
    await send_bike_loans(osc, await bike_loans.getBikeLoansToday(), frequency.value);
}

export async function getBikeLoansLastDay(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of the last day.");
    await send_bike_loans(osc, await bike_loans.getBikeLoansLastDay(), frequency.value);
}

export async function getBikeLoansLastWeek(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of the last week.");
    await send_bike_loans(osc, await bike_loans.getBikeLoansLastWeek(), frequency.value);
}
