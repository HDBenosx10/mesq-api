
exports.index = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "index",
        msg: `Hello World`
    })
}

exports.show = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "show",
        msg: `${req.params.category}`
    })
}

exports.search = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "show",
        msg: `${req.query.q}`
    })
}
