import IRainStation from "@Interfaces/IRainStation";
import Axios from "axios";

async function getRainStation(): Promise<IRainStation[]> {
    const data: IRainStation[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/estacionesPluvio/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

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

                p10m: e.p10m,
                p1h: e.p1h,
                p24h: e.p24h,

                date: e.fecha,

                latitude: e.latitud,
                length: e.longitud,
            });
        });
    }

    return data;
}

export default getRainStation;
