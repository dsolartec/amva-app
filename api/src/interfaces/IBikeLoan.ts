import ICoord from "./ICoord";

interface IBikeLoanData extends ICoord {
    place: string;
    date: string;
}

interface IBikeLoan {
    loan_data: IBikeLoanData;
    return_data: IBikeLoanData;
}

export default IBikeLoan;
