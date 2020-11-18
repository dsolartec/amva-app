import "module-alias/register";
import getAccelerographStations from "@Data/getAccelerographStations";
import { getEnvironmentalNoiseStatusBySchedule, getEnvironmentalNoiseStatusByDay } from "@Data/getEnvironmentalNoiseStatus";
import getLevelStations from "@Data/getLevelStations";
import getRainStations from "@Data/getRainStations";
import getSightings from "@Data/getSightings";
import getUVRadiationStations from "@Data/getUVRadiationStations";
import getWeatherRadar from "@Data/getWeatherRadar";
import getWeatherStations from "@Data/getWeatherStations";
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
    const sightings = await getSightings({ year: 2020, month: 1, day: 10 }, { year: 2020, month: 10, day: 20 });
    const uvRadiationStations = await getUVRadiationStations();
    const weatherRadar = await getWeatherRadar();
    const weatherStations = await getWeatherStations();

    const { app, http } = createServer();
}

initializeAPI().catch(console.log);
