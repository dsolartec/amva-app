import IOSCMessage, { IOSCMessageData } from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import sendOSCError from "@Utils/sendOSCError";
import getBikeLoans from "@Data/getBikeLoans";
import sleep from "@Utils/sleep";

async function onMessage(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    if (message.address === "/get/bike_loans") {
        const [beginDay, beginMonth, beginYear, endDay, endMonth, endYear] = message.args;

        if (!beginDay || beginDay.type !== "i") {
            sendOSCError("You need enter the begin day number.", osc);
            return;
        }

        if (!beginMonth || beginMonth.type !== "i") {
            sendOSCError("You need enter the begin month number.", osc);
            return;
        }

        if (!beginYear || beginYear.type !== "i") {
            sendOSCError("You need enter the begin year number.", osc);
            return;
        }

        if (!endDay || endDay.type !== "i") {
            sendOSCError("You need enter the end day number.", osc);
            return;
        }

        if (!endMonth || endMonth.type !== "i") {
            sendOSCError("You need enter the end month number.", osc);
            return;
        }

        if (!endYear || endYear.type !== "i") {
            sendOSCError("You need enter the end year number.", osc);
            return;
        }

        const bike_loans = await getBikeLoans(
            { year: beginYear.value, month: beginMonth.value, day: beginDay.value },
            { year: endYear.value, month: endMonth.value, day: endDay.value },
        );

        function send_bike_loans(init: number) {
            const args: IOSCMessageData[] = [];

            bike_loans.slice(init, init + 500).forEach((e) => {
                args.push({ type: "f", value: e.loan_data.latitude });
                args.push({ type: "f", value: e.loan_data.length });
                args.push({ type: "f", value: e.return_data.latitude });
                args.push({ type: "f", value: e.return_data.length });
            });
    
            osc.send({ address: "/bike_loans", args });

            console.log("OSC: Sended 500 bike loans.");
        }

        for (let i = 0; i <= bike_loans.length / 500; i++) {
            await sleep(1000);
            send_bike_loans(i * 500);
        }

        return;
    }

    sendOSCError(`The path ${message.address} does not exist.`, osc);
}

export default onMessage;
