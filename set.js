const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0REazJzY2dWR0JCS3pqVWFITGFBY1kvdVJBeFhoa1dJN2FJZU5HZkFFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTZyamp5OGRRYkNocmc5dVVHMHlVRGc1SUd1bFZUamoyOGRhaDhuVjIxbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTWtJeTRQOFFZbzEwUlVkY1g0ZXlNZURMQnBjZm1BMk9yalh0eG9yL20wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPVGZqZ3dib0hBcEVaRERwa0JMTCs5TjVyc0NtMWN3UFVrY3Y1NnpSZmhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNdVNYY3JRNzYrUWZkMm01RXdWTmwzQ1dYOGEvWGZrWU8vR0hwMENoRUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNwaHYyNmkxc2d4TmhQellLRnBLdWVXamU5UndIc2ZtZFVPSnY5TlRPRnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0pCOWVmbjZROVFDUDF4V1J5Qk5DNmc0MFA3VFV2VEdod3cvMmM4TkpVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2hWdWRnWGFULzRrWlV5Vnp1S2dhUDlNYU0zTllaU3ZRWDV4ZG5nWGFqRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjM1ZTNzRk9ERDIzSWJNWkNWcTllcDdvak52WUV4WWpoTnBGOWVBL2haYWRpR2ZoNzhnRkMvY3RxTmYycUlDV2pNYU1DaDZEbTZSMGR0SEhjRS95N0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiJVaXpPYThNRlFUdzNSU3ZaSVRQQ3dmOXRjVXJhR3ZuZjZBOFRWWnJxd0gwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaU0RvQ1JIRlJ2bWE1T3NTam0wQ0pRIiwicGhvbmVJZCI6ImM0MzY4NDE2LThlY2UtNGE1Ni1iZTU1LWZjZTcxOWRmMmU2NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGZTk0bi9HYktrd1F3MVo1M0FDNEVERmxFQmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXBrSERWWnJmQUpJazByRUt1UndKY0lNRXZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijc2V05ONktDIiwibWUiOnsiaWQiOiI5MTk1OTM5MzYxNDU6MzZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xDdTZ2Z0VFTVh4MTdrR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InR4WnNjWWpPaGZ5Y3ZzZTkrOWhKNnVsVEg2RzRuQ2NpdVNpZjF4U1BRbGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Iko2UVdpTVNTSkttaXFJeWpXUCticHZJL0oyVzM4NDNIdUs5NUYyOVpyTitrSzVBV0pJaTM0ak9jUXZOdDhRY1lheUM0cDRWcmgxczVhcDI3dUFKM0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNcjVnZncvWWdoZy9qNXUvdVZKb2hxRCtRQnl6SGlBbnBzVEFPa3krMjNIYVE5aWFOaElJUEorZXNwa1FmdFVvWU5yRkJtVUxnVGFZSitCYXFBK1ZCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTU5MzkzNjE0NTozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiY1diSEdJem9YOG5MN0h2ZnZZU2VycFV4K2h1SnduSXJrb245Y1VqMEpZIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxNTkwMzU1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9McSJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "BOKACHODA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 919593936145",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'bokachoda',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
