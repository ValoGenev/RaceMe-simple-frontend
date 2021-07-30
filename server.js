const express = require("express");
const path = require("path");

const app = express();


app.use("/",express.static(path.resolve(__dirname,"")))

// PathLocationStrategy
app.get('/*', function(req, res) {

    res.sendFile(path.resolve(__dirname,"","index.html"));
})


app.listen(8000,()=> console.log("Server running..."));