import IBikeLoan from "@Interfaces/IBikeLoan";
import Axios from "axios";
import * as Moment from "moment";

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
            let loan_date = e.fechaPrestamo;

            const [loan_date_date, loan_date_time, loan_date_part] = loan_date.split(" ");

            const [loan_time_hour, loan_time_minutes, loan_time_seconds] = loan_date_time.split(":");

            loan_date = `${loan_date_date.split("/").join("-")} ${Number(loan_time_hour) + (loan_date_part.toLowerCase() === "p.m." ? 12 : 0)}:${loan_time_minutes}:${loan_time_seconds}`

            let return_date = e.fechaDevolucion;

            const [return_date_date, return_date_time, return_date_part] = return_date.split(" ");

            const [return_time_hour, return_time_minutes, return_time_seconds] = return_date_time.split(":");

            return_date = `${return_date_date.split("/").join("-")} ${Number(return_time_hour) + (return_date_part.toLowerCase() === "p.m." ? 12 : 0)}:${return_time_minutes}:${return_time_seconds}`

            data.push({
                loan_data: {
                    place: e.descripcionPrestamo,
                    date: Moment(new Date(loan_date)),

                    latitude: Number(e.latitudPrestamo.replace(",", ".")),
                    length: Number(e.longitudPrestamo.replace(",", ".")),
                },
                return_data: {
                    place: e.descripcionDevolucion,
                    date: Moment(new Date(return_date)),

                    latitude: Number(e.latitudDevolucion.replace(",", ".")),
                    length: Number(e.longitudDevolucion.replace(",", ".")),
                },
            });
        });
    }

    return data.sort((a, b) => a.loan_data.date.millisecond() - b.loan_data.date.millisecond());
}

export default getBikeLoans;
