import "module-alias/register";
import { getEnvironmentalNoiseStatusBySchedule, getEnvironmentalNoiseStatusByDay } from "@Data/getEnvironmentalNoiseStatus";
import getLevelStations from "@Data/getLevelStations";
import getUVRadiationStations from "@Data/getUVRadiationStations";
import createServer from "@Server/createServer";

async function initializeAPI() {
    if (process.env.NODE_ENV !== "production") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }

    const environmentalNoiseStatusBySchedule = await getEnvironmentalNoiseStatusBySchedule();
    const environmentalNoiseStatusByDay = await getEnvironmentalNoiseStatusByDay();
    const levelStations = await getLevelStations();
    const uvRadiationStations = await getUVRadiationStations();

    const { app, http } = createServer();
}

initializeAPI().catch(console.log);
