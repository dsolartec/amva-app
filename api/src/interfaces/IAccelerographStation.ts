import ICoord from "./ICoord";

interface IAccelerographStation extends ICoord {
    event_id: number;

    department: string;
    municipality: string;

    magnitude: number;
    depth: number;

    height_above_sea_level: number;
    height_floor_level: number;

    stations_length: number;

    date: string;
}

export default IAccelerographStation;
