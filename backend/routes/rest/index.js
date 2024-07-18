const express = require("express")
const router = express.Router()
const stockRoute = require("../rest/stock")
const { authGuard } = require("../../lib/middleware")  

router.all("*", authGuard)
router.get("/stocks", stockRoute.stockList)
router.get("/stocksprice", stockRoute.stockPriceList)

module.exports = router