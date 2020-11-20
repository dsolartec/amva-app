import ICache from "@Interfaces/ICache";

import getAccelerographStations from "@Data/getAccelerographStations";
import { getEnvironmentalNoiseStatusBySchedule, getEnvironmentalNoiseStatusByDay } from "@Data/getEnvironmentalNoiseStatus";
import getLevelStations from "@Data/getLevelStations";
import getRainStations from "@Data/getRainStations";
import getSimplifiedMunicipalitiesForecast from "@Data/getSimplifiedMunicipalitiesForecast";
import getUVRadiationStations from "@Data/getUVRadiationStations";
import getWeatherRadar from "@Data/getWeatherRadar";
import getWeatherStations from "@Data/getWeatherStations";

async function generateCache(): Promise<ICache> {
    return {
        accelerograph_stations: await getAccelerographStations(),
        environmental_noise_status_by_schedule: await getEnvironmentalNoiseStatusBySchedule(),
        environmental_noise_status_by_day: await getEnvironmentalNoiseStatusByDay(),
        level_stations: await getLevelStations(),
        rain_stations: await getRainStations(),
        simplified_municipalities_forecast: await getSimplifiedMunicipalitiesForecast(),
        ultraviolet_radiation: await getUVRadiationStations(),
        weather_radar: await getWeatherRadar(),
        weather_stations: await getWeatherStations(),
    };
}

export default generateCache;
