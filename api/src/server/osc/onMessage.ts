import IOSCMessage from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import { getBikeLoansToday, getBikeLoansYesterday, getBikeLoansLastWeek } from "./requests/getBikeLoans";
import { getSightingsToday, getSightingsYesterday, getSightingsLastWeek } from "./requests/getSightings";
import sendOSCError from "@Utils/sendOSCError";

async function onMessage(message: IOSCMessage, osc: IUDPPort): Promise<void> {
    switch (message.address.toLowerCase()) {
        case "/get/bike_loans/today": return await getBikeLoansToday(message, osc);
        case "/get/bike_loans/yesterday": return await getBikeLoansYesterday(message, osc);
        case "/get/bike_loans/last_week": return await getBikeLoansLastWeek(message, osc);

        case "/get/sightings/today": return await getSightingsToday(message, osc);
        case "/get/sightings/yesterday": return await getSightingsYesterday(message, osc);
        case "/get/sightings/last_week": return await getSightingsLastWeek(message, osc);

        default: return sendOSCError(`The path ${message.address} does not exist.`, osc);
    }
}

export default onMessage;
