import getLastDay from "@Utils/getLastDay";
import getBikeLoans from "@Data/getBikeLoans";
import IBikeLoan from "@Interfaces/IBikeLoan";

export async function getBikeLoansToday(): Promise<IBikeLoan[]> {
    const today = new Date(Date.now());

    return await getBikeLoans(
        {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        },
        {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        },
    );
}

export async function getBikeLoansLastDay(): Promise<IBikeLoan[]> {
    const yesterday = getLastDay();

    return await getBikeLoans(
        {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
        },
        {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
        },
    );
}

export async function getBikeLoansLastWeek(): Promise<IBikeLoan[]> {
    const current_date = new Date(Date.now());
    let last_week_date = current_date;

    for (let i = 1; i <= 7; i++) {
        last_week_date = getLastDay(last_week_date);
    }

    return await getBikeLoans(
        {
            year: last_week_date.getFullYear(),
            month: last_week_date.getMonth() + 1,
            day: last_week_date.getDate(),
        },
        {
            year: current_date.getFullYear(),
            month: current_date.getMonth() + 1,
            day: current_date.getDate(),
        },
    );
}
