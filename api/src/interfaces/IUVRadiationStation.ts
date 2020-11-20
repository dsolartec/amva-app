import ICoord from "./ICoord";

interface IUVRadiationStation extends ICoord {
    name: string;
    category: string;
    code: string;

    ultraviolet_radiation: number;

    date: string;
}

export default IUVRadiationStation;
