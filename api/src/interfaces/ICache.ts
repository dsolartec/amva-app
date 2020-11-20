import IAccelerographStation from "./IAccelerographStation";
import { IEnvironmentalNoiseStatusByDay, IEnvironmentalNoiseStatusBySchedule } from "./IEnvironmentalNoiseStatus";
import ILevelStation from "./ILevelStation";
import IRainStation from "./IRainStation";
import ISimplifiedMunicipalityForecast from "./ISimplifiedMunicipalityForecast";
import IUVRadiationStation from "./IUVRadiationStation";
import IWeatherRadar from "./IWeatherRadar";
import IWeatherStation from "./IWeatherStation";

interface ICache {
    accelerograph_stations: IAccelerographStation[];
    environmental_noise_status_by_schedule: IEnvironmentalNoiseStatusBySchedule[];
    environmental_noise_status_by_day: IEnvironmentalNoiseStatusByDay[];
    level_stations: ILevelStation[];
    rain_stations: IRainStation[];
    simplified_municipalities_forecast: ISimplifiedMunicipalityForecast[];
    ultraviolet_radiation: IUVRadiationStation[];
    weather_radar: IWeatherRadar[];
    weather_stations: IWeatherStation[];
}

export default ICache;
