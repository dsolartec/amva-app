import IAccelerographStation from "@Interfaces/IAccelerographStation";
import Axios from "axios";

async function getAccelerographStations(): Promise<IAccelerographStation[]> {
    const data: IAccelerographStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesAcelerografoEventosSGC/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                event_id: Number(e.ideventoingeominas),

                department: e.departamento,
                municipality: e.municipio,

                magnitude: e.magnitud,
                depth: e.profundidad,

                height_above_sea_level: e.alturaniveldelmar,
                height_floor_level: e.alturaniveldelpiso,

                stations_length: e.numero_estaciones,

                date: e.fecha,

                latitude: e.latitud,
                length: e.longitud,
            });
        });
    }

    return data;
}

export default getAccelerographStations;
