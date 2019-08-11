function errorHandler (res, httpcode, err) {
    res.json({
        status: "Bad",
        http: httpcode,
        message: err
    });
};

function okHandler (res, name, response) {
    res.json({
        status: "OK",
        topic: name,
        content: response
    });
};

module.exports = {
    OkHandler : okHandler,
    ErrHandler : errorHandler
};