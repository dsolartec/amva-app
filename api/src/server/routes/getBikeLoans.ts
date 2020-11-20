import { Router } from "express";
import * as bike_loans from "@Utils/data/getBikeLoans";

function getBikeLoans(): Router {
    const router: Router = Router();

    router.get("/last_day", async (req, res) => {
        res.status(200).jsonp(await bike_loans.getBikeLoansLastDay());
    });

    return router;
}

export default getBikeLoans;
