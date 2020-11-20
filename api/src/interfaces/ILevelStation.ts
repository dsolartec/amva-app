import ICoord from "./ICoord";

interface ILevelStation {
    name: string;
    code: number;
    category: string;

    percentLevel: number;

    iconColor: { hex: string, rgb: { r: number, g: number, b: number } };
    iconUrl: string;

    coords: ICoord[];
    location: string;

    lastUpdate: string;
}

export default ILevelStation;
