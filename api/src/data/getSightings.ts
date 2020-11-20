import ISighting from "@Interfaces/ISighting";
import Axios from "axios";

interface SightingDate {
    year: number;
    month: number;
    day: number;
}

async function getSightings(begin: SightingDate, end: SightingDate): Promise<ISighting[]> {
    const data: ISighting[] = [];

    try {
        const request = await Axios.get(`https://webservices.metropol.gov.co/SIMAPI/api/Avistamientos/ObtenerAvistamientos?FechaIni=${("0" + begin.day).substr(-2)}/${("0" + begin.month).substr(-2)}/${begin.year}&FechaFin=${("0" + end.day).substr(-2)}/${("0" + end.month).substr(-2)}/${end.year}`);

        const request_data: any[] = request.data || [];

        if (request_data.length) {
            request_data.forEach((e) => {
                data.push({
                    author: e.usuario,
                    image: e.urlImagen,
                    date: e.fechaPublicacion,

                    latitude: e.latitud,
                    length: e.longitud,
                });
            });
        }
    } catch (error) {
        console.log(`Sightings Request Error: ${error}`);
    }

    return data;
}

export default getSightings;
