"use strict";
(() => {
var exports = {};
exports.id = 307;
exports.ids = [307];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 3460:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_Customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3285);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/customers/[id]/restore/route.js




const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
handler.put(async (req, res)=>{
    try {
        await (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
        const { id  } = req.query;
        if (!mongoose__WEBPACK_IMPORTED_MODULE_3___default().Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ID format"
            });
        }
        const restoredCustomer = await _models_Customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(id, {
            isDeleted: false,
            $unset: {
                deletedAt: 1
            }
        }, {
            new: true,
            runValidators: true
        });
        if (!restoredCustomer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }
        // استعادة البيانات المرتبطة
        // await Promise.all([
        //   mongoose.model('Interaction').updateMany(
        //     { customerId: id },
        //     { isDeleted: false, $unset: { deletedAt: 1 } }
        //   ),
        //   mongoose.model('Sale').updateMany(
        //     { customerId: id },
        //     { isDeleted: false, $unset: { deletedAt: 1 } }
        //   )
        // ]);
        res.json({
            success: true,
            message: "Customer restored successfully",
            data: restoredCustomer
        });
    } catch (error) {
        console.error("Restore error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to restore customer",
            details:  false ? 0 : undefined
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
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,285], () => (__webpack_exec__(3460)));
module.exports = __webpack_exports__;

})();