var express = require("express");
const tokenauth = require("../service/tokenauth");
const stockcontroller = require("../controller/stockcontroller");
var apiroute = express.Router();

apiroute.post("/login", stockcontroller.login);
apiroute.post("/stock/search", tokenauth.AuthenticateToken, stockcontroller.search);
apiroute.post("/stock/getdetails/:id", tokenauth.AuthenticateToken, stockcontroller.getdetails);

module.exports = apiroute;