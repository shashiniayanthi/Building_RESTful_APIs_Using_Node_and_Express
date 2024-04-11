const { chunk } = require("lodash")

const getRequestData = (req) => {
 // Write logic here to read the request body data
 return new Promise((resolve, reject) => {
    try {
        let body =""
        // Listen to data sent by client
        req.on("data", (chunk) => {
            // append the string version to body
            body += chunk.toString();
        });
        req.on("end", () =>{
            // Send Back data
            resolve(body);
        });
    } catch (error) {
        reject(error)
    }
 });
}