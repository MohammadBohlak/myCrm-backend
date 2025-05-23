"use strict";
(() => {
var exports = {};
exports.id = 483;
exports.ids = [483];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 3386:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4405);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/users/route.js



// Connect to database
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
handler.get(async (req, res)=>{
    try {
        const admins = await _models_User__WEBPACK_IMPORTED_MODULE_2__/* ["default"].find */ .Z.find({
            role: "admin",
            isDeleted: false
        }).select("-password -__v -isDeleted -deletedAt -company -status");
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
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
var __webpack_exports__ = __webpack_require__.X(0, [762,76], () => (__webpack_exec__(3386)));
module.exports = __webpack_exports__;

})();