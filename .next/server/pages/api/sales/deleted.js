"use strict";
(() => {
var exports = {};
exports.id = 229;
exports.ids = [229];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 8349:
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
/*
 Get all sales (with filters):

GET /api/sales/deleted
GET /api/sales/deleted?customerId=CUSTOMER_ID
GET /api/sales/deleted?productId=PRODUCT_ID
GET /api/sales/deleted?startDate=2023-06-01&endDate=2023-06-30

*/ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// GET all sales
handler.get(async (req, res)=>{
    try {
        const { customerId , productId , startDate , endDate  } = req.query;
        let query = {};
        if (customerId) query.customerId = customerId;
        if (productId) query.productId = productId;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        const sales = await _models_Sale__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
            ...query,
            isDeleted: true
        })//   .populate('customerId', 'name email')
        //   .populate('productId', 'name price')
        .sort({
            date: -1
        });
        res.send(sales);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch sales"
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,414], () => (__webpack_exec__(8349)));
module.exports = __webpack_exports__;

})();