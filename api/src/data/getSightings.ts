import ISighting from "@Interfaces/ISighting";
import Axios from "axios";
import * as Moment from "moment";

interface SightingDate {
    year: number;
    month: number;
    day: number;
}

async function getSightings(begin: SightingDate, end: SightingDate): Promise<ISighting[]> {
    const data: ISighting[] = [];

    const request = await Axios.get(`https://webservices.metropol.gov.co/SIMAPI/api/Avistamientos/ObtenerAvistamientos?FechaIni=${("0" + begin.day).substr(-2)}/${("0" + begin.month).substr(-2)}/${begin.year}&FechaFin=${("0" + end.day).substr(-2)}/${("0" + end.month).substr(-2)}/${end.year}`);

    const request_data: any[] = request.data || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                author: e.usuario,
                image: e.urlImagen,
                date: Moment(new Date(e.fechaPublicacion)),

                latitude: e.latitud,
                length: e.longitud,
            });
        });
    }

    return data.sort((a, b) => a.date.millisecond() - b.date.millisecond());
}

export default getSightings;
