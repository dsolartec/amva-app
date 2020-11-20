function getLastDay(current_date: Date = new Date(Date.now())): Date {
    if (current_date.getDate() === 1) {
        if (current_date.getMonth() === 0) {
            return new Date(`${current_date.getFullYear() - 1}-12-31 00:00:00`);
        }

        let date = `${current_date.getFullYear()}-${current_date.getMonth() + 1}-`;

        switch (current_date.getMonth() + 1) {
            case 2: {
                date += (current_date.getFullYear() % 4 === 0) ? "29" : "28";
                break;
            }

            case 4:
            case 6:
            case 9:
            case 11: {
                date += "30";
                break;
            }

            default: {
                date += "31";
                break;
            }
        }

        return new Date(`${date} 00:00:00`);
    }

    return new Date(`${current_date.getFullYear()}-${current_date.getMonth() + 1}-${current_date.getDate() - 1} 00:00:00`);
}

export default getLastDay;
