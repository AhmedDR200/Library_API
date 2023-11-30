const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers.token;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
    }
    else{
        res.status(400).json({
            status: 'fail',
            message: 'Token not provided'
        });
    }
}


// Authorization the request
function authorization(req, res, next){
    verifyToken(req , res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({
                status: 'fail',
                message: 'You are not allowed to perform this action'
            });
        }
    });
}

// Verify Token is Admin
function verifyTokenIsAdmin(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({
                status: 'fail',
                message: 'Only admin can access this data'
            });
        }
    });
}

module.exports = {
    verifyToken,
    authorization,
    verifyTokenIsAdmin
};
