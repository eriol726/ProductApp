const http = require('http');
const axios = require('axios');
const express = require('express');

const hostname = '127.0.0.1';
const port = 4000;

const app = express(); 

app.listen(port, () => {    
    console.log(`Now listening on port ${port}`); 
});

app.get('/products', (req, res) => {        //get requests to the root ("/") will route here
    let url = `https://cdn.softube.com/api/v1/products?pageSize=1000`;

	res.header("Access-Control-Allow-Origin", "*");
    axios.get(url)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});
