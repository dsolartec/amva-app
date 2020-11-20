import ICoord from "./ICoord";

export interface IEnvironmentalNoiseStatusByScheduleData {
    LRAeqH: number;
    LRAeqH_quality: number;
    date: string;
}

export interface IEnvironmentalNoiseStatusByDayData {
    LRAeqDN: number;
    LRAeqDN_quality: number;

    LRAeqD: number;
    LRAeqD_quality: number;

    LRAeqN: number;
    LRAeqN_quality: number;

    date: string;
}

interface IEnvironmentalNoiseStatus<T> extends ICoord {
    name: { long: string, short: string };
    serialCode: number;

    location: string;

    category: string;
    subCategory: string;

    normalDay: number;
    normalNight: number;

    data_collected: T[];
}

export type IEnvironmentalNoiseStatusBySchedule = IEnvironmentalNoiseStatus<IEnvironmentalNoiseStatusByScheduleData>;

export type IEnvironmentalNoiseStatusByDay = IEnvironmentalNoiseStatus<IEnvironmentalNoiseStatusByDayData>;
