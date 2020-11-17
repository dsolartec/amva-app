import "module-alias/register";
import getAccelerographStations from "@Data/getAccelerographStations";
import { getEnvironmentalNoiseStatusBySchedule, getEnvironmentalNoiseStatusByDay } from "@Data/getEnvironmentalNoiseStatus";
import getLevelStations from "@Data/getLevelStations";
import getRainStations from "@Data/getRainStations";
import getUVRadiationStations from "@Data/getUVRadiationStations";
import createServer from "@Server/createServer";

async function initializeAPI() {
    if (process.env.NODE_ENV !== "production") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }

    const accelerographStations = await getAccelerographStations();
    const environmentalNoiseStatusBySchedule = await getEnvironmentalNoiseStatusBySchedule();
    const environmentalNoiseStatusByDay = await getEnvironmentalNoiseStatusByDay();
    const levelStations = await getLevelStations();
    const rainStations = await getRainStations();
    const uvRadiationStations = await getUVRadiationStations();
    
    const { app, http } = createServer();
}

initializeAPI().catch(console.log);
