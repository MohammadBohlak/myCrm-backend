"use strict";
(() => {
var exports = {};
exports.id = 826;
exports.ids = [826];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 3511:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/users/[id]/restore/route.js



const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
handler.put(async (req, res)=>{
    try {
        await (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
        const { id  } = req.query;
        // إعادة تعيين البريد الإلكتروني إذا كان يحتوي على بادئة deleted_
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(id);
        let email = user.email;
        if (email.startsWith("deleted_")) {
            email = email.replace(/^deleted_\d+_/, "");
        }
        const restoredUser = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(id, {
            isDeleted: false,
            email,
            $unset: {
                deletedAt: 1
            }
        }, {
            new: true
        }).select("-password");
        res.json({
            success: true,
            message: "User restored successfully",
            data: restoredUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to restore user"
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
var __webpack_exports__ = __webpack_require__.X(0, [762,76], () => (__webpack_exec__(3511)));
module.exports = __webpack_exports__;

})();