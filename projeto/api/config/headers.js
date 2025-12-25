function headers(req, res) {
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.setHeader(
        "Acess-Control-Allow-Methods", "GET, POST, PUT, DELET, PATCH"
    );
    res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Content-Type", "application/json");
}

module.exports = headers