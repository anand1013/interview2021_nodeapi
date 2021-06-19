
const jwt = require('jsonwebtoken');
const config = require('../jwtconfig');
module.exports =
{
    //#region AuthenticateToken
    AuthenticateToken: (req, res, next) => {
        try {
            if (!req?.headers?.authorization){
                return res.status(401).json({message: 'Unauthorized'});
            }
            let Bearer = req.headers.authorization.split(' ')[0];
            if (!Bearer || Bearer !== 'Bearer'){
                return res.status(401).json({message: 'Unauthorized'});
            }
            let token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.status(401).json({message: 'Unauthorized'});
            }
            jwt.verify(token, config.jwt_secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({message: 'invalid token'});              
                }
                req.decoded = decoded;
                next();
            });
        }
        catch (err) {
            return res.status(500).json({message:err});              
        }
    }
    //#endregion
}
 