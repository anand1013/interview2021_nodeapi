const Joi = require('joi');
const userservice = require('../service/stockservice');


module.exports =
{
    //#region login
    login: (req, res) => {
        try {
            const schema = Joi.object().keys({
                username: Joi.string().required(),
                password: Joi.string().required()
            });
            const { err, value } = schema.validate(req.body);
            if (err) {
                return res.status(401).json({ statuscode: 401, message: "validation err", data: err.message });
            } else {
                userservice.login(res, value);
            }
        }
        catch (err) {
            return res.status(500).json({ statuscode: 500, message: "internal server error", data:null });
        }
    },
    //#endregion

    //#region search
    search: (req, res) => {
        try {
            const schema = Joi.object().keys({
                search: Joi.string().required()
            });
            const { err, value } = schema.validate(req.body);
            if (err) {
                return res.status(401).json({ statuscode: 401, message: "validation err", data: err.message });
            } else {
                userservice.search(res, value);
            }
        }
        catch (err) {
            return res.status(500).json({ statuscode: 500, message: "internal server error", data: null});
        }
    },
    //#endregion

    //#region getdetails by stock id
    getdetails: (req, res) => {
        try {
            const schema = Joi.object().keys({
                id: Joi.string().required()
            });
            const { err, value } = schema.validate(req.params);
            if (err) {
                return res.status(401).json({ statuscode: 401, message: "validation err", data: err.message });
            } else {
                userservice.getdetails(res, value);
            }
        }
        catch (err) {
            return res.status(500).json({ statuscode: 400, message: "internal server error", data: null });
        }
    },
    //#endregion
}