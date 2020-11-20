import ICache from "@Interfaces/ICache";
import { Router } from "express";
import * as uv_radiation from "@Utils/data/getUVRadiation";

function getUVRadiation(cache: ICache): Router {
    const router: Router = Router();

    router.get("/yesterday", (req, res) => {
        res.status(200).jsonp(uv_radiation.getYesterday(cache.ultraviolet_radiation));
    });

    router.get("/today", (req, res) => {
        res.status(200).jsonp(uv_radiation.getToday(cache.ultraviolet_radiation));
    });

    return router;
}

export default getUVRadiation;
