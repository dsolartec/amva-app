import IBikeLoan from "@Interfaces/IBikeLoan";
import Axios from "axios";

interface BikeLoanDate {
    year: number;
    month: number;
    day: number;
}

async function getBikeLoans(begin: BikeLoanDate, end: BikeLoanDate): Promise<IBikeLoan[]> {
    const data: IBikeLoan[] = [];

    const request = await Axios.get(`https://webservices.metropol.gov.co/SIMAPI/api/EnClicla/ObtenerPrestamos?FechaIni=${begin.year}${("0" + begin.month).substr(-2)}${("0" + begin.day).substr(-2)}&FechaFin=${end.year}${("0" + end.month).substr(-2)}${("0" + end.day).substr(-2)}`);

    const request_data: any[] = request.data || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                loan_data: {
                    place: e.descripcionPrestamo,
                    date: e.fechaPrestamo,

                    latitude: Number(e.latitudPrestamo.replace(",", ".")),
                    length: Number(e.longitudPrestamo.replace(",", ".")),
                },
                return_data: {
                    place: e.descripcionDevolucion,
                    date: e.fechaDevolucion,

                    latitude: Number(e.latitudDevolucion.replace(",", ".")),
                    length: Number(e.longitudDevolucion.replace(",", ".")),
                },
            });
        });
    }

    return data;
}

export default getBikeLoans;
