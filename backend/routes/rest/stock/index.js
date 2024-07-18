const mongoose = require("mongoose")
const stockModel = require("../../../models/stock")

const stockList = async (req, res) => {
    try {
        const stocks = await stockModel.find({}).limit(5).sort({ _id: -1}).select("code")
        const structureStocks = stocks.map((s)=> s.code) 
        return res.status(200).json({ error: false, stocks: structureStocks })
    } catch (error) {
        console.log('Error ->', error)
        return res.status(502).json({ error: true, message: error.message })
    }
}

const stockPriceList = async (req, res) => {
    try {
        const { stock = null } = req.query
        if (stock === null) return res.status(400).json({ error: true, message: "Stock must be needed !" })
        const stockPriceList = await stockModel.find({ code: stock }).limit(20).sort({ _id: -1 })
        return res.status(200).json({ error: false, stocksprice: stockPriceList })
    }  catch (error) {
        console.log('Error ->', error)
        return res.status(502).json({ error: true, message: error.message })
    }
}

module.exports = {
    stockList,
    stockPriceList
}