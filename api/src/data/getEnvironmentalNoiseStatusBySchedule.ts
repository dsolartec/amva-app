import Axios from "axios";
import IEnvironmentalNoiseStatusBySchedule from "@Interfaces/IEnvironmentalNoiseStatusBySchedule";
import getMomentDate from "@Utils/getMomentDate";

async function getEnvironmentalNoiseStatusBySchedule(): Promise<IEnvironmentalNoiseStatusBySchedule[]> {
    const data: IEnvironmentalNoiseStatusBySchedule[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesRuidoAmbientalHorario/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                latitude: e.latitud,
                length: e.longitud,

                name: {
                    long: e.nombreCompleto,
                    short: e.nombreCorto,
                },
                serialCode: e.codigoSerial,

                location: e.municipio,

                category: e.sector,
                subCategory: e.subSector,

                normalDay: e.normaDiurno,
                normalNight: e.normaNocturno,

                data_collected: e.datos ? e.datos.map((e: any) => ({
                    LRAeqH: e.LRAeqH,
                    LRAeqH_quality: Number(e.calidad_LRAeqH),
                    date: getMomentDate(e.fecha),
                })) : [],
            });
        });
    }
    
    return data;
}

export default getEnvironmentalNoiseStatusBySchedule;
