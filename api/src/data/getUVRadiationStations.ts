import IUVRadiationStation from "@Interfaces/IUVRadiationStation";
import Axios from "axios";
import * as Moment from "moment";

async function getUVRadiationStations(): Promise<IUVRadiationStation[]> {
    const data: IUVRadiationStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesRadiacionUV/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                name: e.nombreEstacion,
                category: e.categoriaRadiacionUV,
                code: e.codigoEstacion,

                ultraviolet_radiation: e.radiacionUV,

                date: Moment(new Date(e.fecha)),

                latitude: e.latitudEstacion,
                length: e.longitudEstacion,
            });
        });
    }

    return data.sort((a, b) => a.date.millisecond() - b.date.millisecond());
}

export default getUVRadiationStations;
