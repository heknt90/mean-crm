module.exports.analytics = function(req, res) {
    res.status(200).json({
        analytics: 'from controller'
    })
}

module.exports.overview = function(req, res) {
    res.status(200).json({
        overview: 'from controller'
    })
}