import IWeatherRadar from "@Interfaces/IWeatherRadar";
import Axios from "axios";
import * as Moment from "moment";

async function getWeatherRadar(): Promise<IWeatherRadar[]> {
    const data: IWeatherRadar[] = [];

    const request = await Axios.get("http://siata.gov.co:8089/informacionRadarMeteo01120/cc77055bdd78258a6a92daa6e9de0fa0732a0a36/");

    const request_data: any[] = request.data.datos || [];

    if (request_data.length) {
        request_data.forEach((e) => {
            data.push({
                image: e.url,
                date: Moment(new Date(e.fecha)),
            });
        });
    }

    return data.sort((a, b) => a.date.millisecond() - b.date.millisecond());
}

export default getWeatherRadar;
