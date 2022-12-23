const ev = require("express-validators");
import { body, params }  from "express-validators"

export const newProduct = [
    ev.body("name").notEmpty().withMessage("Name is invalid"),
    ev.body("brand").notEmpty().withMessage("Brand is invalid"),
    ev.body("value").notEmpty().isInt({
        min: 0
    }).withMessage("Value is invalid"),
    ev.body("description").notEmpty().withMessage("Description is invalid")
];


export const validIdProduct = [
    ev.param("id").notEmpty().withMessage("Id is invalid")
];


export const upProduct = [
    ...validIdProduct,
    ...newProduct
]