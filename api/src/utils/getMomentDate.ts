import * as Moment from "moment";

function getMomentDate(date_string: string): Moment.Moment {
    const moment: Moment.Moment = Moment();

    const date_parts = date_string.split(" ");

    if (date_parts.length === 2) {
        const date: number[] = date_parts[0].split("-").map((e) => Number(e));
        const time: number[] = date_parts[1].split(":").map((e) => Number(e));

        if (date.length === 3 && time.length >= 3) {
            const [year, month, day_number] = date;

            moment.set("year", year);
            moment.set("month", month);
            moment.set("date", day_number);

            const [hours, minutes, seconds] = time.slice(0, 3);

            moment.set("hour", hours);
            moment.set("minute", minutes);
            moment.set("second", seconds);
        }
    }

    return moment;
}

export default getMomentDate;
