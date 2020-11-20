import { Router } from "express";
import * as sightings from "@Utils/data/getSightings";

function getSightings(): Router {
    const router: Router = Router();

    router.get("/today", async (req, res) => {
        res.status(200).jsonp(await sightings.getSightingsToday());
    });

    router.get("/yesterday", async (req, res) => {
        res.status(200).jsonp(await sightings.getSightingsYesterday());
    });

    router.get("/last_week", async (req, res) => {
        res.status(200).jsonp(await sightings.getSightingsLastWeek());
    });

    return router;
}

export default getSightings;
