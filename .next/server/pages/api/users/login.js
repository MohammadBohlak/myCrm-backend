"use strict";
(() => {
var exports = {};
exports.id = 877;
exports.ids = [877];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 4712:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var _models_Customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3285);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// app/api/users/route.js




// Connect to database
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
/**
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "simplepassword"
}
 */ handler.post(async (req, res)=>{
    try {
        const { email , password  } = req.body;
        // Find user
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            email,
            isDeleted: false
        });
        if (!user) {
            return res.status(401).send({
                error: "User not found",
                loggedIn: false
            });
        }
        // Compare plaintext passwords (FOR TESTING ONLY)
        if (password !== user.password) {
            return res.status(401).send({
                error: "Invalid credentials",
                loggedIn: false
            });
        }
        // Return user without password
        const userData = user.toObject();
        delete userData.password;
        return res.send({
            userData,
            loggedIn: true
        });
    } catch (error) {
        return res.status(500).send({
            error: "Login failed",
            loggedIn: false
        });
    }
});
handler.delete(async (req, res)=>{
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        const { id  } = req.query;
        //   const { deletedBy } = req.body; // ID المستخدم الذي قام بالحذف (اختياري)
        // 1. البحث عن المستخدم المراد حذفه
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findById */ .Z.findById(id);
        if (!user) {
            // await session.abortTransaction();
            return res.status(404).json({
                error: "User not found"
            });
        }
        // 2. منع حذف المديرين
        if (user.role === "admin") {
            // await session.abortTransaction();
            return res.status(403).json({
                error: "Cannot delete admin users"
            });
        }
        // 3. تحديث المستخدم لحذفه ناعماً
        user.isDeleted = true;
        user.deletedAt = new Date();
        //   user.deletedBy = deletedBy || null;
        await user.save();
        //   await user.save({ session });
        // 4. إزالة ارتباط المستخدم من العملاء (بدون حذفهم)
        await _models_Customer__WEBPACK_IMPORTED_MODULE_3__/* ["default"].updateMany */ .Z.updateMany({
            userId: user._id
        }, {
            $unset: {
                userId: 1
            }
        });
        //   await session.commitTransaction();
        res.json({
            message: "User soft deleted successfully",
            userId: user._id,
            deletedAt: user.deletedAt
        });
    } catch (error) {
        //   await session.abortTransaction();
        console.error("Soft delete error:", error);
        res.status(500).json({
            error: "Failed to soft delete user",
            details: error.message
        });
    } finally{
    //   session.endSession();
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
var __webpack_exports__ = __webpack_require__.X(0, [762,76,285], () => (__webpack_exec__(4712)));
module.exports = __webpack_exports__;

})();