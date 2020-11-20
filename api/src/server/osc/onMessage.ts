import IOSCMessage from "@Interfaces/osc/IOSCMessage";
import IUDPPort from "@Interfaces/osc/IUDPPort";
import * as bike_loans from "./requests/getBikeLoans";
import * as sightings from "./requests/getSightings";
import * as uv_radiation from "./requests/getUVRadiation";
import sendOSCError from "@Utils/sendOSCError";
import ICache from "@Interfaces/ICache";

function onMessage(message: IOSCMessage, osc: IUDPPort, cache: ICache): void {
    switch (message.address.toLowerCase()) {
        case "/bike_loans/yesterday": return bike_loans.getYesterday(message, osc);
        case "/bike_loans/today": return bike_loans.getToday(message, osc);
        case "/bike_loans/last_week": return bike_loans.getLastWeek(message, osc);

        case "/sightings/yesterday": return sightings.getYesterday(message, osc);
        case "/sightings/today": return sightings.getToday(message, osc);
        case "/sightings/last_week": return sightings.getLastWeek(message, osc);

        case "/uv_radiation/yesterday": return uv_radiation.getYesterday(message, osc, cache);
        case "/uv_radiation/today": return uv_radiation.getToday(message, osc, cache);

        default: return sendOSCError(`The path ${message.address} does not exist.`, osc);
    }
}

export default onMessage;
