"use strict";
(() => {
var exports = {};
exports.id = 480;
exports.ids = [480];
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

/***/ 2323:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8721);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var _models_Sale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2414);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/products/[id]/route.js




(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/**
Get single product:
GET /api/products/PRODUCT_ID

Update product:

PUT /api/products/PRODUCT_ID
Content-Type: application/json
{
  "price": 1099.99
}

Delete product:
DELETE /api/products/PRODUCT_ID
 */ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET single product
handler.get(async (req, res)=>{
    try {
        const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id);
        if (!product) {
            return res.status(404).send({
                error: "Product not found"
            });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch product"
        });
    }
});
// PUT update product
handler.put(async (req, res)=>{
    try {
        const updatedProduct = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) {
            return res.status(404).send({
                error: "Product not found"
            });
        }
        res.send(updatedProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        res.status(500).send({
            error: "Failed to update product"
        });
    }
});
// DELETE product
// handler.delete(async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.query.id);
//     if (!deletedProduct) {
//       return res.status(404).send({ error: 'Product not found' });
//     }
//     res.send({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to delete product' });
//   }
// });
// ////////////////////////////
handler.delete(async (req, res)=>{
    try {
        const product = await _models_Product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(req.query.id);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();
        // حذف ناعم للمبيعات المرتبطة
        await _models_Sale__WEBPACK_IMPORTED_MODULE_3__/* ["default"].updateMany */ .Z.updateMany({
            productId: product._id
        }, {
            isDeleted: true,
            deletedAt: new Date()
        });
        res.json({
            message: "Product and related sales soft deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete product"
        });
    }
});
// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,414], () => (__webpack_exec__(2323)));
module.exports = __webpack_exports__;

})();