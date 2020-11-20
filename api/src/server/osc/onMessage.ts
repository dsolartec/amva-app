import IOSCMessage from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import { getBikeLoansLastDay } from "./requests/getBikeLoans";
import sendOSCError from "@Utils/sendOSCError";

async function onMessage(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    switch (message.address.toLowerCase()) {
        case "/get/bike_loans/last_day": return await getBikeLoansLastDay(message, osc);

        default: return sendOSCError(`The path ${message.address} does not exist.`, osc);
    }
}

export default onMessage;
