import IWeatherStation from "@Interfaces/IWeatherStation";
import Axios from "axios";

async function getWeatherStations(): Promise<IWeatherStation[]> {
    const data: IWeatherStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesMeteo/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                name: e.nombre,
                code: e.codigo,

                city: e.ciudad,
                commune: e.comuna,
                neighborhood: e.barrio,
                basin: e.subcuenca,

                dv10m: e.dv10m,
                h10m: e.h10m,
                p10m: e.p10m,
                p1h: e.p1h,
                p24h: e.p24h,
                pr10m: e.pr10m,
                t10m: e.t10m,
                vv10m: e.vv10m,

                date: e.fecha,

                latitude: e.latitud,
                length: e.longitud,
            });
        });
    }

    return data;
}

export default getWeatherStations;
