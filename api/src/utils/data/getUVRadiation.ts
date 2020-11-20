import IUVRadiationStation from "@Interfaces/IUVRadiationStation";
import getLastDay from "@Utils/getLastDay";

export function getYesterday(cache: IUVRadiationStation[]): IUVRadiationStation[] {
    return cache.filter((e) => {
        const yesterday = getLastDay();
        const date = new Date(e.date);

        return date.getFullYear() === yesterday.getFullYear() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getDate() === yesterday.getDate();
    });
}

export function getToday(cache: IUVRadiationStation[]): IUVRadiationStation[] {
    return cache.filter((e) => {
        const current_date = new Date(Date.now());
        const date = new Date(e.date);

        return date.getFullYear() === current_date.getFullYear() &&
            date.getMonth() === current_date.getMonth() &&
            date.getDate() === current_date.getDate();
    });
}
