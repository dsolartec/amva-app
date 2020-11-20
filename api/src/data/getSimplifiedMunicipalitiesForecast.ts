import ISimplifiedMunicipalityForecast from "@Interfaces/ISimplifiedMunicipalityForecast";
import Axios from "axios";

async function getSimplifiedMunicipalitiesForecast(): Promise<ISimplifiedMunicipalityForecast[]> {
    const data: ISimplifiedMunicipalityForecast[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/pronosticoMunicipiosSimplificado/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                name: e.nombreMunicipio.trim(),
                code: e.codigoMunicipio,

                min_measurement: e.medicion_min,
                max_measurement: e.medicion_max,

                last_update: e.ultimaActualizacion,

                forecasts: e.pronosticos ? e.pronosticos.map((e: any) => ({
                    window_name: e.nombreVentana,
                    window_code: e.codigoVentana,

                    quality: e.descripcion,

                    icon: e.urlIcono,

                    begin_date: e.tiempoInicial,
                    end_date: e.tiempoFinal,
                })) : [],
            });
        });
    }

    return data;
}

export default getSimplifiedMunicipalitiesForecast;
