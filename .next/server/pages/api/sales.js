"use strict";
(() => {
var exports = {};
exports.id = 969;
exports.ids = [969];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6075:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Sale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2414);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/sales/index.js



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/**
 Get all sales (with filters):

GET /api/sales
GET /api/sales?customerId=CUSTOMER_ID
GET /api/sales?productId=PRODUCT_ID
GET /api/sales?startDate=2023-06-01&endDate=2023-06-30


Create a sale:

POST /api/sales
Content-Type: application/json
{
  "customerId": "CUSTOMER_ID",
  "productId": "PRODUCT_ID",
  "amount": 999.99,
  "date": "2023-06-15"
}
 */ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET all sales
handler.get(async (req, res)=>{
    try {
        const sales = await _models_Sale__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
            isDeleted: false
        }).sort({
            date: -1
        });
        res.send(sales);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch sales"
        });
    }
});
// POST create new sale
handler.post(async (req, res)=>{
    try {
        const { customerName , productName , customerPhone , amount , status , date  } = req.body;
        if (!customerName || !productName || amount === undefined) {
            return res.status(400).send({
                error: "Customer, product and amount are required"
            });
        }
        const newSale = new _models_Sale__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
            customerName,
            productName,
            customerPhone,
            amount: Number(amount),
            date: date ? new Date(date) : new Date(),
            status
        });
        await newSale.save();
        res.status(201).send(newSale);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                error: error.message
            });
        }
        console.log(error);
        res.status(500).send({
            error: "Failed to create sale"
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
var __webpack_exports__ = __webpack_require__.X(0, [762,414], () => (__webpack_exec__(6075)));
module.exports = __webpack_exports__;

})();