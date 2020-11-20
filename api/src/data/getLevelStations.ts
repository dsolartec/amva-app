import Axios from "axios";
import ILevelStation from "@Interfaces/ILevelStation";

async function getLevelStation(): Promise<ILevelStation[]> {
    const data: ILevelStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesNivel/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            const rgbColor: string[] = e.colorIconoRGB.replace("rgb(", "").replace(")", "").split(",");

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

                lastUpdate: e.ultimaActualizacion,
            });
        });
    }

    return data;
}

export default getLevelStation;
