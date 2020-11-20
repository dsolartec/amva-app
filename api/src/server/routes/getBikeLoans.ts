import { Router } from "express";
import * as bike_loans from "@Utils/data/getBikeLoans";

function getBikeLoans(): Router {
    const router: Router = Router();

    router.get("/today", async (req, res) => {
        res.status(200).jsonp(await bike_loans.getBikeLoansToday());
    });

    router.get("/last_day", async (req, res) => {
        res.status(200).jsonp(await bike_loans.getBikeLoansLastDay());
    });

    router.get("/last_week", async (req, res) => {
        res.status(200).jsonp(await bike_loans.getBikeLoansLastWeek());
    });

    return router;
}

export default getBikeLoans;
