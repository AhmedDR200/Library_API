// Error Handler Middleware 404
const error404 = (req, res, next) => {
    const error = new Error(`Route not found for ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        message: error.message
    });
    next(error);
};

// Error Handler Middleware 500
const error500 = (err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
};


module.exports = {
    error404,
    error500
};
