const express = require("express");
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, , authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});

var port =  process.env.PORT || 2410;
app.listen(port, () => console.log(`Server Started on port ${port}!`));

let axios = require("axios")

app.post("/fetchData", async function(req,res){
    const { method, fetchURL, data } = req.body;
 
    try {
        let response ;
        if(method === "GET")
        {
            response = await axios.get(fetchURL)
        }
        else if(method === "POST")
        {
            response = await axios.post(fetchURL, data )
            console.log(response.data)
        }
        else {
            return res.status(400).send({ error : "Invalid method"} );
        }

        console.log(response)
        res.send(response.data)

    }
    catch (err)
    {

          console.log(err.response)
        if(err.response)
        {
            let {status, stautsText} = err.response;
            res.status(status).send(stautsText)
        }
        else
        {
            res.send(404).send(err)
        }
    }
} )