import getBikeLoans from "@Data/getBikeLoans";
import IBikeLoan from "@Interfaces/IBikeLoan";

export async function getBikeLoansLastDay(): Promise<IBikeLoan[]> {
    const current_date = new Date(Date.now());

    let begin_date: Date;
    let end_date: Date;

    if (current_date.getDate() === 1) {
        if (current_date.getMonth() === 0) {
            begin_date = new Date(`${current_date.getFullYear() - 1}-12-31 00:00:00`);
            end_date = new Date(`${current_date.getFullYear() - 1}-12-31 23:59:59`);
        } else {
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

            begin_date = new Date(`${date} 00:00:00`);
            end_date = new Date(`${date} 23:59:59`);
        }
    } else {
        const date = `${current_date.getFullYear()}-${current_date.getMonth() + 1}-${current_date.getDate() - 1}`;
        begin_date = new Date(`${date} 00:00:00`);
        end_date = new Date(`${date} 23:59:59`);
    }

    return await getBikeLoans(
        {
            year: begin_date.getFullYear(),
            month: begin_date.getMonth() + 1,
            day: begin_date.getDate(),
        },
        {
            year: end_date.getFullYear(),
            month: end_date.getMonth() + 1,
            day: end_date.getDate(),
        },
    );
}
