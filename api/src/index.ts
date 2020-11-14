import "module-alias/register";
import getEnvironmentalNoiseStatusBySchedule from "@Data/getEnvironmentalNoiseStatusBySchedule";
import getLevelStations from "@Data/getLevelStations";
import createServer from "@Server/createServer";

async function initializeAPI() {
    if (process.env.NODE_ENV !== "production") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }

    const environmentalNoiseStatusBySchedule = await getEnvironmentalNoiseStatusBySchedule();
    const levelStationsData = await getLevelStations();

    const { app, http } = createServer();
}

initializeAPI().catch(console.log);
