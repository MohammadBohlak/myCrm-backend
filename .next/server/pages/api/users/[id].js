"use strict";
(() => {
var exports = {};
exports.id = 56;
exports.ids = [56];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6780:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4405);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var _models_Customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3285);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// Connect to database
(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
handler.get(async (req, res)=>{
    try {
        console.log("id:: ", req.query.id);
        // const { id } = req.query;
        // التحقق من صحة ObjectId قبل الاستعلام
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //   return res.status(400).json({
        //     success: false,
        //     error: "Invalid user ID format"
        //   });
        // }
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findById */ .Z.findById(req.query.id);
        console.log(user);
        // const user = await User.findById(id)
        // .select("-password -__v -refreshToken") // استبعاد الحقول الحساسة
        // .lean(); // لتحسين الأداء
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        // إضافة بيانات إضافية إذا لزم الأمر
        // const userData = {
        //   ...user,
        //   metadata: {
        //     registeredSince: new Date(user.createdAt).toLocaleDateString(),
        //     isActive: !user.isDeleted
        //   }
        // };
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error("Get user by ID error:", err);
        res.status(500).json({
            success: false,
            error: "Server error",
            details:  false ? 0 : null
        });
    }
});
handler.delete(async (req, res)=>{
    try {
        // const user = await User.findById(req.query.id);
        const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, {
            isDeleted: true
        }, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        user.isDeleted = true;
        user.deletedAt = new Date();
        await user.save();
        // إزالة ارتباط المستخدم من العملاء
        await _models_Customer__WEBPACK_IMPORTED_MODULE_3__/* ["default"].updateMany */ .Z.updateMany({
            userId: user._id
        }, {
            $set: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        res.json({
            message: "User soft deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete user"
        });
    }
});
handler.put(async (req, res)=>{
    try {
        const { id  } = req.query;
        const updateData = req.body;
        // إذا كانت هناك كلمة سر جديدة، نقوم بتشفيرها
        // if (updateData.password) {
        //   updateData.password = await hashPassword(updateData.password);
        // }
        const updatedUser = await _models_User__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(id, {
            ...updateData,
            updatedAt: Date.now()
        }, {
            new: true,
            runValidators: true
        });
        // .select("-password"); // استبعاد كلمة السر من الناتج
        if (!updatedUser) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        res.send(updatedUser);
    } catch (err) {
        console.error("Update error:", err);
        if (err.name === "ValidationError") {
            return res.status(400).send({
                error: err.message
            });
        }
        res.status(500).send({
            error: "Failed to update user",
            details: err.message
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
var __webpack_exports__ = __webpack_require__.X(0, [762,76,285], () => (__webpack_exec__(6780)));
module.exports = __webpack_exports__;

})();