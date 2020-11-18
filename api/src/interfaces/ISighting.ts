import ICoord from "./ICoord";
import { Moment } from "moment";

interface ISighting extends ICoord {
    author: string;
    image: string;
    date: Moment;
}

export default ISighting;
