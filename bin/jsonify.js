module.exports = function jsonify (res, err, msg) {
    if (err) {
        msg.status = "Bad"
        msg.error = err
    }
    else {
        msg.status = "OK"
    }
    res.json(msg)
    return 1
}