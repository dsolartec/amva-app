import ICoord from "./ICoord";
import { Moment } from "moment";

interface IBikeLoanData extends ICoord {
    place: string;
    date: Moment;
}

interface IBikeLoan {
    loan_data: IBikeLoanData;
    return_data: IBikeLoanData;
}

export default IBikeLoan;
