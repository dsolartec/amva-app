import ICoord from "./ICoord";

interface ISighting extends ICoord {
    author: string;
    image: string;
    date: string;
}

export default ISighting;
