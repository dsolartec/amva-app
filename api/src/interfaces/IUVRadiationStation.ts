import ICoord from "./ICoord";
import { Moment } from "moment";

interface IUVRadiationStation extends ICoord {
    name: string;
    category: string;
    code: string;

    ultraviolet_radiation: number;

    date: Moment;
}

export default IUVRadiationStation;
