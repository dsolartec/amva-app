interface ISimplifiedMunicipalityForecasts {
    window_name: string;
    window_code: number;

    quality: string;

    icon: string;

    begin_date: string;
    end_date: string;
}

interface ISimplifiedMunicipalityForecast {
    name: string;
    code: number;

    min_measurement: string;
    max_measurement: string;

    last_update: string;

    forecasts: ISimplifiedMunicipalityForecasts[];
}

export default ISimplifiedMunicipalityForecast;
