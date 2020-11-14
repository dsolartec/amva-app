import Axios from "axios";
import ILevelStation from "@Interfaces/ILevelStation";
import * as Moment from "moment";

async function getLevelStation(): Promise<ILevelStation[]> {
    const data: ILevelStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesNivel/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos;

    if (request_data.length) {
        request_data.forEach((e) => {
            const rgbColor: string[] = e.colorIconoRGB.replace("rgb(", "").replace(")", "").split(",");
            const lastUpdate: string[] = e.ultimaActualizacion.split(" ");
            const date: number[] = lastUpdate[0].split("-").map((e) => Number(e));
            const time: number[] = lastUpdate[1].split(":").map((e) => Number(e));

            data.push({
                name: e.nombre,
                code: e.codigo,
                category: e.categoria,

                percentLevel: e.porcentajeNivel,

                iconColor: {
                    hex: e.colorIconoHex,
                    rgb: {
                        r: Number(rgbColor[0]),
                        g: Number(rgbColor[1]),
                        b: Number(rgbColor[2]),
                    },
                },
                iconUrl: e.urlIcono,

                coords: e.coordenadas.length
                    ? e.coordenadas.map((coord: any) => ({ latitude: coord.latitud, length: coord.longitud }))
                    : [],
                location: e.subCuenca,

                lastUpdate: Moment()
                    .set("year", date[0])
                    .set("month", date[1])
                    .set("date", date[2])
                    .set("hour", time[0])
                    .set("minute", time[1])
                    .set("second", time[2])
                    .set("millisecond", time[3]),
            });
        });
    }

    return data;
}

export default getLevelStation;
