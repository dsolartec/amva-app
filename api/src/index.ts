import "module-alias/register";
import generateCache from "@Server/generateCache";
import createOSC from "@Server/createOSC";
import createServer from "@Server/createServer";

async function initializeAPI() {
    if (process.env.NODE_ENV !== "production") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }

    const cache = await generateCache();

    createOSC(cache);
    createServer(cache);
}

initializeAPI().catch(console.log);
