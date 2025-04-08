"use strict";
(() => {
var exports = {};
exports.id = 221;
exports.ids = [221];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// models/Product.js

const productSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: [
            true,
            "Product name is required"
        ],
        trim: true
    },
    price: {
        type: Number,
        required: [
            true,
            "Price is required"
        ],
        min: [
            0,
            "Price cannot be negative"
        ]
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
// productSchema.pre(/^find/, function () {
//   this.where({ isDeleted: false });
// });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Product) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Product", productSchema));


/***/ }),

/***/ 7772:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8721);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/products/index.js



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/**
Create a product:

POST /api/products
Content-Type: application/json
{
  "name": "New Product",
  "price": 99.99,
  "description": "Product description"
}

Get all products (with optional search):

GET /api/products
GET /api/products?search=laptop

 */ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET all products
handler.get(async (req, res)=>{
    try {
        const { search  } = req.query;
        let query = {};
        if (search) {
            query = {
                $or: [
                    {
                        name: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            };
        }
        const products = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
            ...query,
            isDeleted: false
        }).sort({
            createdAt: -1
        });
        res.send(products);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch products"
        });
    }
});
// POST create new product
handler.post(async (req, res)=>{
    try {
        const { name , price , description  } = req.body;
        if (!name || price === undefined) {
            return res.status(400).send({
                error: "Name and price are required"
            });
        }
        const newProduct = new _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
            name,
            price: Number(price),
            description
        });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        res.status(500).send({
            error: "Failed to create product"
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762], () => (__webpack_exec__(7772)));
module.exports = __webpack_exports__;

})();