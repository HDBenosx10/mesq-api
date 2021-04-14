exports.index = (req, res) => {
    res.status(200).json({
        status: "Running",
        router: "user",
        rota: "index"
    })
}
