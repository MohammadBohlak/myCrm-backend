"use strict";
(() => {
var exports = {};
exports.id = 543;
exports.ids = [543];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6838:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4405);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



 // تأكد من استيراد mongoose للتحقق من ObjectId
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
handler.delete(async (req, res)=>{
    try {
        // 1. الاتصال بقاعدة البيانات (مع await)
        await (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
        // 2. التحقق من صحة ObjectId
        if (!mongoose__WEBPACK_IMPORTED_MODULE_3___default().Types.ObjectId.isValid(req.query.id)) {
            return res.status(400).send({
                error: "Invalid user ID format"
            });
        }
        // 3. حذف المستخدم
        const deletedUser = await _models_User__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findByIdAndDelete */ .Z.findByIdAndDelete(req.query.id);
        if (!deletedUser) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        // 4. (اختياري) تحديث العملاء المرتبطين بهذا المستخدم
        await mongoose__WEBPACK_IMPORTED_MODULE_3___default().model("Customer").updateMany({
            userId: req.query.id
        }, {
            $set: {
                isDeleted: true
            }
        });
        res.send({
            success: true,
            message: "User deleted successfully",
            deletedUserId: req.query.id
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).send({
            success: false,
            error: "Failed to delete user",
            details:  false ? 0 : undefined
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler); // import nc from 'next-connect';
 // import dbConnect from '@/utils/dbConnect';
 // import User from '@/models/User';
 //  dbConnect();
 // const handler = nc();
 // handler.delete(async (req, res) => {
 //     try {
 //       const deletedUser = await User.findByIdAndDelete(req.query.id);
 //       if (!deletedUser) {
 //         return res.status(404).send({ error: 'User not found' });
 //       }
 //       res.send({ message: 'User deleted successfully' });
 //     } catch (error) {
 //       res.status(500).send({ error: 'Failed to delete user' });
 //     }
 //   });

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [762,76], () => (__webpack_exec__(6838)));
module.exports = __webpack_exports__;

})();