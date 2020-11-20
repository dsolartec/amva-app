import IOSCMessage from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import { getBikeLoansToday, getBikeLoansLastDay, getBikeLoansLastWeek } from "./requests/getBikeLoans";
import sendOSCError from "@Utils/sendOSCError";

async function onMessage(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    switch (message.address.toLowerCase()) {
        case "/get/bike_loans/today": return await getBikeLoansToday(message, osc);
        case "/get/bike_loans/last_day": return await getBikeLoansLastDay(message, osc);
        case "/get/bike_loans/last_week": return await getBikeLoansLastWeek(message, osc);

        default: return sendOSCError(`The path ${message.address} does not exist.`, osc);
    }
}

export default onMessage;
