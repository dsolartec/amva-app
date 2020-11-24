import * as bike_loans from "@Utils/data/getBikeLoans";
import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import IBikeLoan from "@Interfaces/IBikeLoan";

function send_bike_loans(osc: IUDPPort, data: IBikeLoan[], frequency: number): void {
    console.log(`OSC: Got ${data.length} bike loans.`);

    data.forEach((e, i) => {
        setTimeout(() => {
            const args: IOSCMessageData[] = [];

            args.push({ type: "f", value: e.loan_data.latitude });
            args.push({ type: "f", value: e.loan_data.length });
            args.push({ type: "f", value: e.return_data.latitude });
            args.push({ type: "f", value: e.return_data.length });

            osc.send({ address: "/bike_loans", args });
            console.log("OSC: Sent 1 bike loan.");
        }, i * frequency);
    });
}

export function getYesterday(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of yesterday.");
    bike_loans.getBikeLoansYesterday()
        .then((data) => send_bike_loans(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get bike loans of yesterday: ${error}`));
}

export function getToday(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of today.");
    bike_loans.getBikeLoansToday()
        .then((data) => send_bike_loans(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get bike loans of today: ${error}`));
}

export function getLastWeek(message: IOSCMessage, osc: IUDPPort): void {
    const [frequency] = message.args;

    if (!frequency || frequency.type !== "i") {
        sendOSCError("You need enter a frequency.", osc);
        return;
    }

    console.log("OSC: Requested bike loans of the last week.");
    bike_loans.getBikeLoansLastWeek()
        .then((data) => send_bike_loans(osc, data, frequency.value))
        .catch((error) => console.log(`OSC Error: Get bike loans of the last week: ${error}`));
}
