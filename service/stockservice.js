
const pool = require('../connection');
const jwtconfig = require('../jwtconfig');
const jwt = require('jsonwebtoken');
module.exports = {

    //#region login
    login: (res, data) => {
        try {
            pool.getConnection(function (err, connection) {
                try {
                    if (err) {
                        return res.status(500).json({ statuscode: 500, message: "connection failed", data: null});
                    } else {
                        connection.query('CALL nse_userlogin(?,?)', [data.username, data.password], function (err, results_data) {
                            try {
                                if (err) {
                                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null});
                                } else {
                                    if (results_data.length > 0) {
                                        if (results_data[0].length !== 0) {
                                            console.log(typeof (results_data[0][0].id));
                                            if (results_data[0][0].responce) {
                                                return res.status(401).json({ statuscode: 400, message: "invalid user", data: null });
                                            }
                                            else {
                                                const token = jwt.sign({ userid: results_data[0][0].user_id }, jwtconfig.jwt_secret, { algorithm: 'HS512' });
                                                return res.status(200).json({ statuscode: 200, message: "login success", data: { user_token: token } });
                                            }
                                        }
                                        else {
                                            connection.release();
                                            return res.status(401).json({ statuscode: 400, message: "invalid user", data: null });
                                        }
                                    }
                                    else {
                                        connection.release();
                                        return res.status(401).json({ statuscode: 400, message: "invalid user", data: null });
                                    }
                                }
                            }
                            catch (err) {
                                return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                            }
                        });
                    }
                }
                catch (err) {
                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                }
            });
        }
        catch (err) {
            return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
        }
    },
    //#endregion

    //#region search
    search: (res, data) => {
        try {
            pool.getConnection(function (err, connection) {
                try {
                    if (err) {
                        return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                    }
                    else {
                        connection.query('CALL nse_getstocksugg(?)', [data.search], function (err, results_data) {
                            try {
                                if (err) {
                                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                                } else {
                                    if (results_data.length > 0) {
                                        if (results_data[0].length !== 0) {
                                            return res.status(200).json({ statuscode: 200, message: "stock", data: results_data[0] });
                                        }
                                        else {
                                            connection.release();
                                            return res.status(200).json({ statuscode: 200, message: "stock", data: null });
                                        }
                                    }
                                    else {
                                        connection.release();
                                        return res.status(200).json({ statuscode: 200, message: "stock", data: null });
                                    }
                                }
                            }
                            catch (err) {
                                return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                            }
                        });
                    }
                }

                catch (err) {
                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                }
            });
        }
        catch (err) {
            return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
        }
    },
    //#endregion

    //#region getdetails
    getdetails: (res, data) => {
        try {
            pool.getConnection(function (err, connection) {
                try {
                    if (err) {
                        return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                    }
                    else {
                        connection.query('CALL nse_getstock_byid(?)', [data.id], function (err, results_data) {
                            try {
                                if (err) {
                                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                                } else {
                                    if (results_data.length > 0) {
                                        if (results_data[0].length !== 0) {
                                            return res.status(200).json({ statuscode: 200, message: "stock", data: results_data[0] });
                                        }
                                        else {
                                            connection.release();
                                            return res.status(200).json({ statuscode: 200, message: "stock", data: null });
                                        }
                                    }
                                    else {
                                        connection.release();
                                        return res.status(200).json({ statuscode: 200, message: "stock", data: null });
                                    }
                                }
                            }
                            catch (err) {
                                return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                            }
                        });
                    }
                }

                catch (err) {
                    return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
                }
            });
        }
        catch (err) {
            return res.status(500).json({ statuscode: 500, message: "internal server error", data: null });
        }
    },
    //#endregion

}