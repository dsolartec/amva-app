import ICoord from "./ICoord";
import { Moment } from "moment";

interface ILevelStation {
    name: string;
    code: number;
    category: string;

    percentLevel: number;

    iconColor: { hex: string, rgb: { r: number, g: number, b: number } };
    iconUrl: string;

    coords: ICoord[];
    location: string;

    lastUpdate: Moment;
}

export default ILevelStation;
