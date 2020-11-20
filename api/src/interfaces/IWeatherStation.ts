import ICoord from "./ICoord";

interface IWeatherStation extends ICoord {
    name: string;
    code: number;

    city: string;
    commune: string;
    neighborhood: string;
    basin: string;

    dv10m: number;
    h10m: number;
    p10m: number;
    p1h: number;
    p24h: number;
    pr10m: number;
    t10m: number;
    vv10m: number;

    date: string;
}

export default IWeatherStation;
