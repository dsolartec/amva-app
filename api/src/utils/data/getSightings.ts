import getLastDay from "@Utils/getLastDay";
import getSightings from "@Data/getSightings";
import ISighting from "@Interfaces/ISighting";

export async function getSightingsToday(): Promise<ISighting[]> {
    const today = new Date(Date.now());

    return await getSightings(
        {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        },
        {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate() + 1,
        },
    );
}

export async function getSightingsYesterday(): Promise<ISighting[]> {
    const yesterday = getLastDay();

    return await getSightings(
        {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate() - 1,
        },
        {
            year: yesterday.getFullYear(),
            month: yesterday.getMonth() + 1,
            day: yesterday.getDate(),
        },
    );
}

export async function getSightingsLastWeek(): Promise<ISighting[]> {
    const current_date = new Date(Date.now());
    let last_week_date = current_date;

    for (let i = 1; i <= 7; i++) {
        last_week_date = getLastDay(last_week_date);
    }

    return await getSightings(
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
