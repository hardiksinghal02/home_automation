const https = require('https');

const sendGetRequest = (host, path, headers) => {
    
    var options = {
        host: host,
        path: path,
        headers: headers
    };

    return new Promise((resolve, reject) => {

        const req = https.get(options, (res) => {
            res.setEncoding('utf8');
            var responseString = "";
            
            //accept incoming data asynchronously
            res.on('data', chunk => {
                responseString = responseString + chunk;
            });
            
            //return the data when streaming is complete
            res.on('end', () => {
                resolve({
                    responseString : responseString,
                    statusCode : res.statusCode
                })
            });
        });
        
        req.on('error', (err) => {
            reject(err.message);
        });
    })
}

const sendPostRequest = (host, path, payload, headers) => {
    console.log("sending a post request")
    
    var options = {
        host: host,
        path: path,
        method: 'POST',
        headers: headers
    };

    var postData = JSON.stringify(payload);
    console.log(postData);

    return new Promise((resolve, reject) => {

        var req = https.request(options, res => {

            res.setEncoding('utf8');
            var responseString = "";
            
            res.on('data', chunk => {
                responseString = responseString + chunk;
            });
            
            res.on('end', () => {
                resolve({
                    responseString : responseString,
                    statusCode : res.statusCode
                })
            });
        });

        req.on('error', (err) => {
            console.log("In req.on error : " + err.message);
            reject(err.message);
        });

        req.write(postData)
        req.end();
    })
}


module.exports = {
    sendGetRequest : sendGetRequest,
    sendPostRequest : sendPostRequest
}