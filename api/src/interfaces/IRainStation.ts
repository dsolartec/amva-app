import ICoord from "./ICoord";

interface IRainStation extends ICoord {
    name: string;
    code: number;

    city: string;
    commune: string;
    neighborhood: string;
    basin: string;

    p10m: number;
    p1h: number;
    p24h: number;

    date: string;
}

export default IRainStation;
