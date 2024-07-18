const authGuard = (req, res, next) => {
    try {
        const apiKey = req.headers["api_key"]
        if (apiKey !== process.env.APP_TOKEN) return res.status(401).json({ error: true, message: "Unauthorized, please contact to admin !" })
        return next()
    } catch (error) {
        console.log('Error ->', error)
        return res.status(502).json({ error: true, message: error.message })
    }
}

module.exports = {
    authGuard
}