'use strict';
var mysql = require('mysql');
var Client = require('node-rest-client').Client;
var jwt = require('jsonwebtoken');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "lance"
});

let date = new Date();
date = date.getFullYear() + "-"+ ("0" + (date.getMonth() + 1)).slice(-2) +"-" + ("0" + date.getDate()).slice(-2);

let query = 'SELECT * FROM auctions WHERE endDate LIKE \"' + date + '%\"';

var client = new Client();
var token = jwt.sign({id: 'auction-end'}, 'banana', {algorithm: 'HS256'});


con.query(query,function(err,rows){
    if(err) throw err;

    for(var i in rows) {
        let postObject = {
            "redirectUrl": "to fix",
            "reviewUrl": "to fix",
            "productId": rows[i].productId,
            "auctionId": rows[i].auctionId
        };

        let args = {
            data: postObject,
            headers: {"Content-Type": "application/json",
            "token" : token}
        };

        client.post("http://localhost:7780/users/"+rows[i].userId+"/purchases", args, function (data, response) {
            console.log("http://localhost:7780/users/"+rows[i].userId+"/purchases",data);
        });
    }
});
