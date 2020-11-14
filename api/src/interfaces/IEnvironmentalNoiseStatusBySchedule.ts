import ICoord from "./ICoord";
import { Moment } from "moment";

export interface IEnvironmentalNoiseStatusByScheduleData {
    LRAeqH: number;
    LRAeqH_quality: number;
    date: Moment;
}

interface IEnvironmentalNoiseStatusBySchedule extends ICoord {
    name: { long: string, short: string };
    serialCode: number;

    location: string;

    category: string;
    subCategory: string;

    normalDay: number;
    normalNight: number;

    data_collected: IEnvironmentalNoiseStatusByScheduleData[];
}

export default IEnvironmentalNoiseStatusBySchedule;
