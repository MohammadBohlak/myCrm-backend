"use strict";
(() => {
var exports = {};
exports.id = 724;
exports.ids = [724];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 3960:
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
// app/api/sales/[id]/route.js



(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
/**
 Get single sale:
GET /api/sales/SALE_ID

Update sale:
PUT /api/sales/SALE_ID
Content-Type: application/json
{
  "amount": 1099.99
}

Delete sale:
DELETE /api/sales/SALE_ID
 */ const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
// 
// DELETE sale
handler.delete(async (req, res)=>{
    try {
        const deletedSale = await _models_Sale__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndDelete */ .Z.findByIdAndDelete(req.query.id);
        if (!deletedSale) {
            return res.status(404).send({
                error: "Sale not found"
            });
        }
        res.send({
            message: "Sale deleted successfully"
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete sale"
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
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,414], () => (__webpack_exec__(3960)));
module.exports = __webpack_exports__;

})();