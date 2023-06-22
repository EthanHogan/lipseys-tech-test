import fs from "fs";
import { parse } from "csv-parse";

export const getAllEmails = async () => {
    return new Promise((resolve, reject) => {
        const emails = [];
        fs.createReadStream("./emails/emails3a89.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                emails.push(row[0]);
            })
            .on("end", function () {
                resolve(emails);
            })
            .on("error", function (error) {
                reject(error.message);
            });
    });
}
